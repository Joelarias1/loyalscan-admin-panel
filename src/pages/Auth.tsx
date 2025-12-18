import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Loader2, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

// --------------------------------
// Tipos y Enums
// --------------------------------

enum AuthView {
  SIGN_IN = "sign-in",
  SIGN_UP = "sign-up",
  FORGOT_PASSWORD = "forgot-password",
  RESET_SUCCESS = "reset-success",
}

interface AuthState {
  view: AuthView;
}

interface FormState {
  isLoading: boolean;
  error: string | null;
  showPassword: boolean;
}

// --------------------------------
// Esquemas de Validación
// --------------------------------

const signInSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

const signUpSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  terms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
});

type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// --------------------------------
// Componente de Autenticación Principal
// --------------------------------

function Auth({ className, ...props }: React.ComponentProps<"div">) {
  const [state, setState] = React.useState<AuthState>({ view: AuthView.SIGN_IN });
  const { user, isSuperadmin, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && user && isSuperadmin) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, isSuperadmin, loading, navigate]);

  const setView = React.useCallback((view: AuthView) => {
    setState((prev) => ({ ...prev, view }));
  }, []);

  if (loading) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-background">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
       </div>
     );
   }

  return (
    <div
      data-slot="auth"
      className={cn("min-h-screen flex items-center justify-center bg-background p-4", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-md relative overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-xl backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {state.view === AuthView.SIGN_IN && (
              <AuthSignIn
                key="sign-in"
                onForgotPassword={() => setView(AuthView.FORGOT_PASSWORD)}
                onSignUp={() => setView(AuthView.SIGN_UP)}
              />
            )}
            {state.view === AuthView.SIGN_UP && (
              <AuthSignUp
                key="sign-up"
                onSignIn={() => setView(AuthView.SIGN_IN)}
              />
            )}
            {state.view === AuthView.FORGOT_PASSWORD && (
              <AuthForgotPassword
                key="forgot-password"
                onSignIn={() => setView(AuthView.SIGN_IN)}
                onSuccess={() => setView(AuthView.RESET_SUCCESS)}
              />
            )}
            {state.view === AuthView.RESET_SUCCESS && (
              <AuthResetSuccess
                key="reset-success"
                onSignIn={() => setView(AuthView.SIGN_IN)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// --------------------------------
// Componentes Compartidos
// --------------------------------

interface AuthFormProps<T> {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  children: React.ReactNode;
  className?: string;
}

function AuthForm<T>({ onSubmit, children, className }: AuthFormProps<T>) {
  return (
    <form
      onSubmit={onSubmit}
      data-slot="auth-form"
      className={cn("space-y-6", className)}
    >
      {children}
    </form>
  );
}

interface AuthErrorProps {
  message: string | null;
}

function AuthError({ message }: AuthErrorProps) {
  if (!message) return null;
  return (
    <div
      data-slot="auth-error"
      className="mb-6 animate-in rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive"
    >
      {message}
    </div>
  );
}

// --------------------------------
// Componente Inicio de Sesión
// --------------------------------

interface AuthSignInProps {
  onForgotPassword: () => void;
  onSignUp: () => void;
}

function AuthSignIn({ onForgotPassword, onSignUp }: AuthSignInProps) {
  const [formState, setFormState] = React.useState<FormState>({
    isLoading: false,
    error: null,
    showPassword: false,
  });

  const { signIn } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setFormState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const { error } = await signIn(data.email, data.password);
      if (error) {
         setFormState((prev) => ({ ...prev, error: "Credenciales inválidas o error de acceso." }));
      }
    } catch {
      setFormState((prev) => ({ ...prev, error: "Ha ocurrido un error inesperado" }));
    } finally {
      setFormState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <motion.div
      data-slot="auth-sign-in"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="p-8"
    >
       <div className="mb-8 flex flex-col items-start text-left">
        <div className="flex items-center gap-2 mb-6 transition-all duration-200">
          <img 
            src="/logo.svg" 
            alt="Logo" 
            className="h-10 w-10 object-contain" 
          />
          <span className="font-bold text-2xl tracking-tight text-foreground">
            LoyalScan
          </span>
        </div>
        <h1 className="text-3xl font-semibold text-foreground">Bienvenido</h1>
        <p className="mt-2 text-sm text-muted-foreground">Inicia sesión en tu cuenta</p>
      </div>

      <AuthError message={formState.error} />

      <AuthForm<SignInFormValues> onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="nombre@ejemplo.com"
            disabled={formState.isLoading}
            className={cn(errors.email && "border-destructive")}
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 text-xs"
              onClick={onForgotPassword}
              disabled={formState.isLoading}
            >
              ¿Olvidaste tu contraseña?
            </Button>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={formState.showPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={formState.isLoading}
              className={cn(errors.password && "border-destructive")}
              {...register("password")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={() =>
                setFormState((prev) => ({ ...prev, showPassword: !prev.showPassword }))
              }
              disabled={formState.isLoading}
            >
              {formState.showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={formState.isLoading}>
          {formState.isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Iniciando sesión...
            </>
          ) : (
            "Iniciar sesión"
          )}
        </Button>
      </AuthForm>

      <p className="mt-8 text-left text-sm text-muted-foreground">
        ¿No tienes cuenta?{" "}
        <Button
          variant="link"
          className="h-auto p-0 text-sm"
          onClick={onSignUp}
          disabled={formState.isLoading}
        >
          Crea una
        </Button>
      </p>
    </motion.div>
  );
}

// --------------------------------
// Componente Registro
// --------------------------------

interface AuthSignUpProps {
  onSignIn: () => void;
}

function AuthSignUp({ onSignIn }: AuthSignUpProps) {
  const [formState, setFormState] = React.useState<FormState>({
    isLoading: false,
    error: null,
    showPassword: false,
  });

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", terms: false },
  });

  const terms = watch("terms");

  const onSubmit = async (data: SignUpFormValues) => {
    setFormState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simular llamada API
      setFormState((prev) => ({ ...prev, error: "El registro está deshabilitado actualmente." }));
    } catch {
      setFormState((prev) => ({ ...prev, error: "Ha ocurrido un error inesperado" }));
    } finally {
      setFormState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <motion.div
      data-slot="auth-sign-up"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="p-8"
    >
      <div className="mb-8 flex flex-col items-start text-left">
        <div className="flex items-center gap-2 mb-6 transition-all duration-200">
          <img 
            src="/logo.svg" 
            alt="Logo" 
            className="h-10 w-10 object-contain" 
          />
          <span className="font-bold text-xl tracking-tight text-foreground">
            LoyalScan
          </span>
        </div>
        <h1 className="text-3xl font-semibold text-foreground">Crear cuenta</h1>
        <p className="mt-2 text-sm text-muted-foreground">Comienza hoy mismo</p>
      </div>

      <AuthError message={formState.error} />

      <AuthForm<SignUpFormValues> onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            type="text"
            placeholder="Juan Pérez"
            disabled={formState.isLoading}
            className={cn(errors.name && "border-destructive")}
            {...register("name")}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="nombre@ejemplo.com"
            disabled={formState.isLoading}
            className={cn(errors.email && "border-destructive")}
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={formState.showPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={formState.isLoading}
              className={cn(errors.password && "border-destructive")}
              {...register("password")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={() =>
                setFormState((prev) => ({ ...prev, showPassword: !prev.showPassword }))
              }
              disabled={formState.isLoading}
            >
              {formState.showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={terms}
            onCheckedChange={(checked) => setValue("terms", checked === true)}
            disabled={formState.isLoading}
          />
          <div className="space-y-1">
            <Label htmlFor="terms" className="text-sm">
              Acepto los términos y condiciones
            </Label>
            <p className="text-xs text-muted-foreground">
              Al registrarte, aceptas nuestros{" "}
              <Button variant="link" className="h-auto p-0 text-xs">
                Términos
              </Button>{" "}
              y{" "}
              <Button variant="link" className="h-auto p-0 text-xs">
                Política de Privacidad
              </Button>
              .
            </p>
          </div>
        </div>
        {errors.terms && <p className="text-xs text-destructive">{errors.terms.message}</p>}

        <Button type="submit" className="w-full" disabled={formState.isLoading}>
          {formState.isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creando cuenta...
            </>
          ) : (
            "Crear cuenta"
          )}
        </Button>
      </AuthForm>

      <p className="mt-8 text-left text-sm text-muted-foreground">
        ¿Ya tienes cuenta?{" "}
        <Button
          variant="link"
          className="h-auto p-0 text-sm"
          onClick={onSignIn}
          disabled={formState.isLoading}
        >
          Inicia sesión
        </Button>
      </p>
    </motion.div>
  );
}

// --------------------------------
// Componente Recuperar Contraseña
// --------------------------------

interface AuthForgotPasswordProps {
  onSignIn: () => void;
  onSuccess: () => void;
}

function AuthForgotPassword({ onSignIn, onSuccess }: AuthForgotPasswordProps) {
  const [formState, setFormState] = React.useState<FormState>({
    isLoading: false,
    error: null,
    showPassword: false,
  });

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setFormState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simular llamada API
      onSuccess();
    } catch {
      setFormState((prev) => ({ ...prev, error: "Ha ocurrido un error inesperado" }));
    } finally {
      setFormState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <motion.div
      data-slot="auth-forgot-password"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="p-8"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-4"
        onClick={onSignIn}
        disabled={formState.isLoading}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Volver</span>
      </Button>

      <div className="mb-8 flex flex-col items-start text-left">
        <div className="flex items-center gap-2 mb-6 transition-all duration-200">
          <img 
            src="/logo.svg" 
            alt="Logo" 
            className="h-10 w-10 object-contain" 
          />
          <span className="font-bold text-xl tracking-tight text-foreground">
            LoyalScan
          </span>
        </div>
        <h1 className="text-3xl font-semibold text-foreground">Recuperar contraseña</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ingresa tu correo para recibir un enlace de recuperación
        </p>
      </div>

      <AuthError message={formState.error} />

      <AuthForm<ForgotPasswordFormValues> onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="nombre@ejemplo.com"
            disabled={formState.isLoading}
            className={cn(errors.email && "border-destructive")}
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={formState.isLoading}>
          {formState.isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar enlace"
          )}
        </Button>
      </AuthForm>

      <p className="mt-8 text-left text-sm text-muted-foreground">
        ¿Recordaste tu contraseña?{" "}
        <Button
          variant="link"
          className="h-auto p-0 text-sm"
          onClick={onSignIn}
          disabled={formState.isLoading}
        >
          Inicia sesión
        </Button>
      </p>
    </motion.div>
  );
}

// --------------------------------
// Componente Éxito en Recuperación
// --------------------------------

interface AuthResetSuccessProps {
  onSignIn: () => void;
}

function AuthResetSuccess({ onSignIn }: AuthResetSuccessProps) {
  return (
    <motion.div
      data-slot="auth-reset-success"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col items-start p-8 text-left"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <MailCheck className="h-8 w-8 text-primary" />
      </div>

      <h1 className="text-2xl font-semibold text-foreground">Revisa tu correo</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Hemos enviado un enlace de recuperación a tu bandeja de entrada.
      </p>

      <Button
        variant="outline"
        className="mt-6 w-full max-w-xs"
        onClick={onSignIn}
      >
        Volver al inicio de sesión
      </Button>

      <p className="mt-6 text-xs text-muted-foreground">
        ¿No recibiste nada? Revisa spam o{" "}
        <Button variant="link" className="h-auto p-0 text-xs">
          intenta con otro correo
        </Button>
      </p>
    </motion.div>
  );
}

// --------------------------------
// Exportaciones
// --------------------------------

export {
  Auth as default,
  AuthSignIn,
  AuthSignUp,
  AuthForgotPassword,
  AuthResetSuccess,
  AuthForm,
  AuthError,
};
