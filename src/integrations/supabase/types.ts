export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_usage: {
        Row: {
          business_id: string
          completion_tokens: number
          created_at: string | null
          date: string
          id: string
          prompt_tokens: number
          request_count: number
          updated_at: string | null
        }
        Insert: {
          business_id: string
          completion_tokens?: number
          created_at?: string | null
          date: string
          id?: string
          prompt_tokens?: number
          request_count?: number
          updated_at?: string | null
        }
        Update: {
          business_id?: string
          completion_tokens?: number
          created_at?: string | null
          date?: string
          id?: string
          prompt_tokens?: number
          request_count?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_usage_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      business: {
        Row: {
          address: string | null
          average_customer_spend: number | null
          brand_color: string | null
          business_currency: string | null
          business_objectives: Json | null
          business_type: string | null
          city: string | null
          country: string | null
          created_at: string | null
          description: string | null
          email: string
          fiscal_id: string | null
          id: string
          is_trial: boolean | null
          logo_url: string | null
          marketing_spend_currency: string | null
          monthly_marketing_spend: number | null
          name: string
          onboarding_completed: boolean | null
          onboarding_completed_at: string | null
          owner_id: string | null
          payment_status: string | null
          phone: string | null
          return_customer_percentage: number | null
          settings: Json | null
          setup_completed: boolean | null
          slug: string | null
          status: string | null
          stripe_customer_id: string | null
          timezone: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          address?: string | null
          average_customer_spend?: number | null
          brand_color?: string | null
          business_currency?: string | null
          business_objectives?: Json | null
          business_type?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          email: string
          fiscal_id?: string | null
          id?: string
          is_trial?: boolean | null
          logo_url?: string | null
          marketing_spend_currency?: string | null
          monthly_marketing_spend?: number | null
          name: string
          onboarding_completed?: boolean | null
          onboarding_completed_at?: string | null
          owner_id?: string | null
          payment_status?: string | null
          phone?: string | null
          return_customer_percentage?: number | null
          settings?: Json | null
          setup_completed?: boolean | null
          slug?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          timezone?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          address?: string | null
          average_customer_spend?: number | null
          brand_color?: string | null
          business_currency?: string | null
          business_objectives?: Json | null
          business_type?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          email?: string
          fiscal_id?: string | null
          id?: string
          is_trial?: boolean | null
          logo_url?: string | null
          marketing_spend_currency?: string | null
          monthly_marketing_spend?: number | null
          name?: string
          onboarding_completed?: boolean | null
          onboarding_completed_at?: string | null
          owner_id?: string | null
          payment_status?: string | null
          phone?: string | null
          return_customer_percentage?: number | null
          settings?: Json | null
          setup_completed?: boolean | null
          slug?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          timezone?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      business_implementation: {
        Row: {
          business_id: string
          created_at: string | null
          customers_tour_completed: boolean | null
          dashboard_tour_completed: boolean | null
          first_customer_registered: boolean | null
          first_loyalty_card_created: boolean | null
          first_stamp_given: boolean | null
          id: string
          link_added: boolean | null
          loyalty_cards_tour_completed: boolean | null
          reward_added: boolean | null
          setup_completed_at: string | null
          setup_started_at: string | null
          staff_member_added: boolean | null
          updated_at: string | null
          wallet_pass_downloaded: boolean | null
          welcome_modal_seen: boolean | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          customers_tour_completed?: boolean | null
          dashboard_tour_completed?: boolean | null
          first_customer_registered?: boolean | null
          first_loyalty_card_created?: boolean | null
          first_stamp_given?: boolean | null
          id?: string
          link_added?: boolean | null
          loyalty_cards_tour_completed?: boolean | null
          reward_added?: boolean | null
          setup_completed_at?: string | null
          setup_started_at?: string | null
          staff_member_added?: boolean | null
          updated_at?: string | null
          wallet_pass_downloaded?: boolean | null
          welcome_modal_seen?: boolean | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          customers_tour_completed?: boolean | null
          dashboard_tour_completed?: boolean | null
          first_customer_registered?: boolean | null
          first_loyalty_card_created?: boolean | null
          first_stamp_given?: boolean | null
          id?: string
          link_added?: boolean | null
          loyalty_cards_tour_completed?: boolean | null
          reward_added?: boolean | null
          setup_completed_at?: string | null
          setup_started_at?: string | null
          staff_member_added?: boolean | null
          updated_at?: string | null
          wallet_pass_downloaded?: boolean | null
          welcome_modal_seen?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "business_implementation_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      business_settings: {
        Row: {
          business_id: string | null
          category: string
          created_at: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string | null
        }
        Insert: {
          business_id?: string | null
          category: string
          created_at?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string | null
        }
        Update: {
          business_id?: string | null
          category?: string
          created_at?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_settings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      business_subscriptions: {
        Row: {
          business_id: string
          created_at: string
          id: string
          is_active: boolean
          subscription_id: string
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          subscription_id: string
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          subscription_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_subscriptions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_subscriptions_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_recipients: {
        Row: {
          campaign_id: string | null
          clicked_at: string | null
          created_at: string | null
          customer_id: string | null
          delivered_at: string | null
          delivery_status: string | null
          error_message: string | null
          id: string
          opened_at: string | null
        }
        Insert: {
          campaign_id?: string | null
          clicked_at?: string | null
          created_at?: string | null
          customer_id?: string | null
          delivered_at?: string | null
          delivery_status?: string | null
          error_message?: string | null
          id?: string
          opened_at?: string | null
        }
        Update: {
          campaign_id?: string | null
          clicked_at?: string | null
          created_at?: string | null
          customer_id?: string | null
          delivered_at?: string | null
          delivery_status?: string | null
          error_message?: string | null
          id?: string
          opened_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_recipients_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_recipients_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          action_url: string | null
          business_id: string | null
          campaign_type: string
          clicked_count: number | null
          created_at: string | null
          created_by: string | null
          delivered_count: number | null
          description: string | null
          id: string
          image_url: string | null
          location_id: string | null
          message_body: string
          message_title: string | null
          name: string
          opened_count: number | null
          scheduled_for: string | null
          sent_at: string | null
          status: string | null
          target_audience: string | null
          target_criteria: Json | null
          total_recipients: number | null
          updated_at: string | null
        }
        Insert: {
          action_url?: string | null
          business_id?: string | null
          campaign_type: string
          clicked_count?: number | null
          created_at?: string | null
          created_by?: string | null
          delivered_count?: number | null
          description?: string | null
          id?: string
          image_url?: string | null
          location_id?: string | null
          message_body: string
          message_title?: string | null
          name: string
          opened_count?: number | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string | null
          target_audience?: string | null
          target_criteria?: Json | null
          total_recipients?: number | null
          updated_at?: string | null
        }
        Update: {
          action_url?: string | null
          business_id?: string | null
          campaign_type?: string
          clicked_count?: number | null
          created_at?: string | null
          created_by?: string | null
          delivered_count?: number | null
          description?: string | null
          id?: string
          image_url?: string | null
          location_id?: string | null
          message_body?: string
          message_title?: string | null
          name?: string
          opened_count?: number | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string | null
          target_audience?: string | null
          target_criteria?: Json | null
          total_recipients?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      catalog_modal_settings: {
        Row: {
          benefits_text: string
          catalog_id: string
          created_at: string | null
          decline_button_text: string
          description: string
          id: string
          image_url: string | null
          is_active: boolean
          join_button_text: string
          title: string
          updated_at: string | null
        }
        Insert: {
          benefits_text?: string
          catalog_id: string
          created_at?: string | null
          decline_button_text?: string
          description?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          join_button_text?: string
          title?: string
          updated_at?: string | null
        }
        Update: {
          benefits_text?: string
          catalog_id?: string
          created_at?: string | null
          decline_button_text?: string
          description?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          join_button_text?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "catalog_modal_settings_catalog_id_fkey"
            columns: ["catalog_id"]
            isOneToOne: true
            referencedRelation: "catalogs"
            referencedColumns: ["id"]
          },
        ]
      }
      catalogs: {
        Row: {
          business_id: string | null
          created_at: string | null
          description: string | null
          file_path: string
          file_size: number | null
          file_url: string
          id: string
          image_url: string | null
          is_active: boolean | null
          loyalty_card_id: string | null
          mime_type: string | null
          name: string
          updated_at: string | null
          webp_image_url: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          description?: string | null
          file_path: string
          file_size?: number | null
          file_url: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          loyalty_card_id?: string | null
          mime_type?: string | null
          name: string
          updated_at?: string | null
          webp_image_url?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          description?: string | null
          file_path?: string
          file_size?: number | null
          file_url?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          loyalty_card_id?: string | null
          mime_type?: string | null
          name?: string
          updated_at?: string | null
          webp_image_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "catalogs_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "catalogs_loyalty_card_id_fkey"
            columns: ["loyalty_card_id"]
            isOneToOne: true
            referencedRelation: "loyalty_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          business_id: string | null
          city: string | null
          country: string | null
          created_at: string | null
          customer_segment: string | null
          date_of_birth: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          last_visit_date: string | null
          location_id: string | null
          notes: string | null
          phone: string | null
          registration_source: string | null
          status: string | null
          total_points: number | null
          total_spent: number | null
          updated_at: string | null
          visits_count: number | null
        }
        Insert: {
          address?: string | null
          business_id?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          customer_segment?: string | null
          date_of_birth?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          last_visit_date?: string | null
          location_id?: string | null
          notes?: string | null
          phone?: string | null
          registration_source?: string | null
          status?: string | null
          total_points?: number | null
          total_spent?: number | null
          updated_at?: string | null
          visits_count?: number | null
        }
        Update: {
          address?: string | null
          business_id?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          customer_segment?: string | null
          date_of_birth?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          last_visit_date?: string | null
          location_id?: string | null
          notes?: string | null
          phone?: string | null
          registration_source?: string | null
          status?: string | null
          total_points?: number | null
          total_spent?: number | null
          updated_at?: string | null
          visits_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      email_ai_template_generations: {
        Row: {
          business_context: Json | null
          business_id: string
          created_at: string
          error_message: string | null
          generated_name: string | null
          generated_preheader: string | null
          generated_subject: string | null
          generation_duration_ms: number | null
          had_reference_image: boolean | null
          id: string
          llm_structured_response: Json | null
          model_used: string | null
          program_type: string | null
          purpose: string | null
          reference_url: string | null
          success: boolean | null
          template_id: string | null
          tokens_input: number | null
          tokens_output: number | null
          unlayer_design: Json | null
          user_prompt: string
          was_saved: boolean | null
        }
        Insert: {
          business_context?: Json | null
          business_id: string
          created_at?: string
          error_message?: string | null
          generated_name?: string | null
          generated_preheader?: string | null
          generated_subject?: string | null
          generation_duration_ms?: number | null
          had_reference_image?: boolean | null
          id?: string
          llm_structured_response?: Json | null
          model_used?: string | null
          program_type?: string | null
          purpose?: string | null
          reference_url?: string | null
          success?: boolean | null
          template_id?: string | null
          tokens_input?: number | null
          tokens_output?: number | null
          unlayer_design?: Json | null
          user_prompt: string
          was_saved?: boolean | null
        }
        Update: {
          business_context?: Json | null
          business_id?: string
          created_at?: string
          error_message?: string | null
          generated_name?: string | null
          generated_preheader?: string | null
          generated_subject?: string | null
          generation_duration_ms?: number | null
          had_reference_image?: boolean | null
          id?: string
          llm_structured_response?: Json | null
          model_used?: string | null
          program_type?: string | null
          purpose?: string | null
          reference_url?: string | null
          success?: boolean | null
          template_id?: string | null
          tokens_input?: number | null
          tokens_output?: number | null
          unlayer_design?: Json | null
          user_prompt?: string
          was_saved?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "email_ai_template_generations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_ai_template_generations_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaign_recipients: {
        Row: {
          campaign_id: string
          created_at: string | null
          customer_id: string
          email: string
          error_message: string | null
          external_activity_id: string | null
          external_message_id: string | null
          first_name: string | null
          id: string
          location_email_sender_name: string | null
          location_name: string | null
          loyalty_club_customer_id: string | null
          sent_at: string | null
          status: string
        }
        Insert: {
          campaign_id: string
          created_at?: string | null
          customer_id: string
          email: string
          error_message?: string | null
          external_activity_id?: string | null
          external_message_id?: string | null
          first_name?: string | null
          id?: string
          location_email_sender_name?: string | null
          location_name?: string | null
          loyalty_club_customer_id?: string | null
          sent_at?: string | null
          status?: string
        }
        Update: {
          campaign_id?: string
          created_at?: string | null
          customer_id?: string
          email?: string
          error_message?: string | null
          external_activity_id?: string | null
          external_message_id?: string | null
          first_name?: string | null
          id?: string
          location_email_sender_name?: string | null
          location_name?: string | null
          loyalty_club_customer_id?: string | null
          sent_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_campaign_recipients_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaign_recipients_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaign_recipients_loyalty_club_customer_id_fkey"
            columns: ["loyalty_club_customer_id"]
            isOneToOne: false
            referencedRelation: "loyalty_club_customers"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaigns: {
        Row: {
          business_id: string
          created_at: string | null
          filter_criteria: Json
          html_content: string
          id: string
          location_id: string | null
          loyalty_club_id: string | null
          name: string
          scheduled_at: string | null
          sent_at: string | null
          sent_count: number | null
          status: string
          subject: string
          template_id: string | null
          total_recipients: number | null
          updated_at: string | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          filter_criteria?: Json
          html_content: string
          id?: string
          location_id?: string | null
          loyalty_club_id?: string | null
          name: string
          scheduled_at?: string | null
          sent_at?: string | null
          sent_count?: number | null
          status?: string
          subject: string
          template_id?: string | null
          total_recipients?: number | null
          updated_at?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          filter_criteria?: Json
          html_content?: string
          id?: string
          location_id?: string | null
          loyalty_club_id?: string | null
          name?: string
          scheduled_at?: string | null
          sent_at?: string | null
          sent_count?: number | null
          status?: string
          subject?: string
          template_id?: string | null
          total_recipients?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_campaigns_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaigns_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaigns_loyalty_club_id_fkey"
            columns: ["loyalty_club_id"]
            isOneToOne: false
            referencedRelation: "loyalty_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          business_id: string
          category: string
          created_at: string | null
          deleted_at: string | null
          design_json: Json | null
          html_content: string
          id: string
          name: string
          status: string
          subject: string
          updated_at: string | null
          use_count: number | null
        }
        Insert: {
          business_id: string
          category?: string
          created_at?: string | null
          deleted_at?: string | null
          design_json?: Json | null
          html_content: string
          id?: string
          name: string
          status?: string
          subject: string
          updated_at?: string | null
          use_count?: number | null
        }
        Update: {
          business_id?: string
          category?: string
          created_at?: string | null
          deleted_at?: string | null
          design_json?: Json | null
          html_content?: string
          id?: string
          name?: string
          status?: string
          subject?: string
          updated_at?: string | null
          use_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "email_templates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      email_unsubscribes: {
        Row: {
          business_id: string
          created_at: string | null
          customer_id: string | null
          email: string
          id: string
          source_campaign_id: string | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          customer_id?: string | null
          email: string
          id?: string
          source_campaign_id?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          customer_id?: string | null
          email?: string
          id?: string
          source_campaign_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_unsubscribes_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_unsubscribes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_unsubscribes_source_campaign_id_fkey"
            columns: ["source_campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount_due_cents: number
          amount_paid_cents: number
          business_id: string
          created_at: string
          currency: string
          due_date: string | null
          hosted_invoice_url: string | null
          id: string
          invoice_number: string | null
          invoice_pdf_url: string | null
          paid_at: string | null
          status: string
          stripe_invoice_id: string
          subscription_id: string | null
        }
        Insert: {
          amount_due_cents: number
          amount_paid_cents?: number
          business_id: string
          created_at?: string
          currency?: string
          due_date?: string | null
          hosted_invoice_url?: string | null
          id?: string
          invoice_number?: string | null
          invoice_pdf_url?: string | null
          paid_at?: string | null
          status: string
          stripe_invoice_id: string
          subscription_id?: string | null
        }
        Update: {
          amount_due_cents?: number
          amount_paid_cents?: number
          business_id?: string
          created_at?: string
          currency?: string
          due_date?: string | null
          hosted_invoice_url?: string | null
          id?: string
          invoice_number?: string | null
          invoice_pdf_url?: string | null
          paid_at?: string | null
          status?: string
          stripe_invoice_id?: string
          subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string
          business_id: string | null
          city: string
          country: string
          created_at: string | null
          deleted_at: string | null
          email_sender_name: string | null
          geopush_message: string | null
          id: string
          is_active: boolean | null
          is_main_location: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          operating_hours: Json | null
          settings: Json | null
          state_province: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          business_id?: string | null
          city: string
          country: string
          created_at?: string | null
          deleted_at?: string | null
          email_sender_name?: string | null
          geopush_message?: string | null
          id?: string
          is_active?: boolean | null
          is_main_location?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          operating_hours?: Json | null
          settings?: Json | null
          state_province?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          business_id?: string | null
          city?: string
          country?: string
          created_at?: string | null
          deleted_at?: string | null
          email_sender_name?: string | null
          geopush_message?: string | null
          id?: string
          is_active?: boolean | null
          is_main_location?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          operating_hours?: Json | null
          settings?: Json | null
          state_province?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_club_customers: {
        Row: {
          actual_stamps: number
          created_at: string | null
          current_cycle: number | null
          current_cycle_spend: number | null
          current_level_id: string | null
          customer_id: string | null
          death_expiration_date: string | null
          google_pass_creation_link: string | null
          id: string
          is_active: boolean | null
          level_total_spend: number | null
          loyalty_club_id: string | null
          pass_file_name: string | null
          prepaid_balance: number | null
          reset_expiration_date: string | null
          stamps_visit_count: number | null
          total_spend: number | null
          updated_at: string | null
        }
        Insert: {
          actual_stamps?: number
          created_at?: string | null
          current_cycle?: number | null
          current_cycle_spend?: number | null
          current_level_id?: string | null
          customer_id?: string | null
          death_expiration_date?: string | null
          google_pass_creation_link?: string | null
          id?: string
          is_active?: boolean | null
          level_total_spend?: number | null
          loyalty_club_id?: string | null
          pass_file_name?: string | null
          prepaid_balance?: number | null
          reset_expiration_date?: string | null
          stamps_visit_count?: number | null
          total_spend?: number | null
          updated_at?: string | null
        }
        Update: {
          actual_stamps?: number
          created_at?: string | null
          current_cycle?: number | null
          current_cycle_spend?: number | null
          current_level_id?: string | null
          customer_id?: string | null
          death_expiration_date?: string | null
          google_pass_creation_link?: string | null
          id?: string
          is_active?: boolean | null
          level_total_spend?: number | null
          loyalty_club_id?: string | null
          pass_file_name?: string | null
          prepaid_balance?: number | null
          reset_expiration_date?: string | null
          stamps_visit_count?: number | null
          total_spend?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_club_customers_current_level_id_fkey"
            columns: ["current_level_id"]
            isOneToOne: false
            referencedRelation: "loyalty_club_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_club_customers_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_club_customers_loyalty_club_id_fkey"
            columns: ["loyalty_club_id"]
            isOneToOne: false
            referencedRelation: "loyalty_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_club_levels: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: string
          is_active: boolean | null
          level_min_spend: number
          level_name: string
          level_number: number
          loyalty_club_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          is_active?: boolean | null
          level_min_spend: number
          level_name: string
          level_number: number
          loyalty_club_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          is_active?: boolean | null
          level_min_spend?: number
          level_name?: string
          level_number?: number
          loyalty_club_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_club_levels_loyalty_club_id_fkey"
            columns: ["loyalty_club_id"]
            isOneToOne: false
            referencedRelation: "loyalty_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_club_registration_links: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: string
          is_active: boolean | null
          loyalty_club_id: string
          name: string
          registrations_count: number | null
          short_id: number
          slug: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          is_active?: boolean | null
          loyalty_club_id: string
          name: string
          registrations_count?: number | null
          short_id?: number
          slug: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          is_active?: boolean | null
          loyalty_club_id?: string
          name?: string
          registrations_count?: number | null
          short_id?: number
          slug?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_club_registration_links_loyalty_club_id_fkey"
            columns: ["loyalty_club_id"]
            isOneToOne: false
            referencedRelation: "loyalty_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_club_rewards: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          display_order: number | null
          expiration_days: number | null
          has_expiration: boolean | null
          id: string
          image_url: string | null
          is_active: boolean | null
          level_id: string | null
          loyalty_club_id: string
          name: string
          reward_type: string
          reward_value: number | null
          stamps_required: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          display_order?: number | null
          expiration_days?: number | null
          has_expiration?: boolean | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          level_id?: string | null
          loyalty_club_id: string
          name: string
          reward_type: string
          reward_value?: number | null
          stamps_required?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          display_order?: number | null
          expiration_days?: number | null
          has_expiration?: boolean | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          level_id?: string | null
          loyalty_club_id?: string
          name?: string
          reward_type?: string
          reward_value?: number | null
          stamps_required?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_club_rewards_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "loyalty_club_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_club_rewards_loyalty_club_id_fkey"
            columns: ["loyalty_club_id"]
            isOneToOne: false
            referencedRelation: "loyalty_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_clubs: {
        Row: {
          builder_done: boolean
          business_id: string | null
          catalog_id: string | null
          created_at: string | null
          death_expiration_days: number | null
          death_expiration_enabled: boolean | null
          description: string | null
          google_logo_url: string | null
          gradient_end_color: string | null
          gradient_start_color: string | null
          hero_image_url: string | null
          id: string
          is_active: boolean | null
          location_id: string | null
          logo_position: string | null
          logo_url: string | null
          name: string
          notification_url: string | null
          pass_background_color: string | null
          pass_text_color: string | null
          prefilled_stamps: number
          prepaid_amount: number | null
          require_date_of_birth: boolean | null
          require_email: boolean | null
          require_first_name: boolean | null
          require_last_name: boolean | null
          require_phone: boolean | null
          reset_expiration_days: number | null
          reset_expiration_enabled: boolean | null
          rewards_type: string
          stamp_color: string | null
          stamp_style: string | null
          stamps_icon_url: string | null
          stamps_limit: number | null
          stamps_with_circle: boolean
          terms_and_conditions: string | null
          updated_at: string | null
        }
        Insert: {
          builder_done?: boolean
          business_id?: string | null
          catalog_id?: string | null
          created_at?: string | null
          death_expiration_days?: number | null
          death_expiration_enabled?: boolean | null
          description?: string | null
          google_logo_url?: string | null
          gradient_end_color?: string | null
          gradient_start_color?: string | null
          hero_image_url?: string | null
          id?: string
          is_active?: boolean | null
          location_id?: string | null
          logo_position?: string | null
          logo_url?: string | null
          name: string
          notification_url?: string | null
          pass_background_color?: string | null
          pass_text_color?: string | null
          prefilled_stamps?: number
          prepaid_amount?: number | null
          require_date_of_birth?: boolean | null
          require_email?: boolean | null
          require_first_name?: boolean | null
          require_last_name?: boolean | null
          require_phone?: boolean | null
          reset_expiration_days?: number | null
          reset_expiration_enabled?: boolean | null
          rewards_type: string
          stamp_color?: string | null
          stamp_style?: string | null
          stamps_icon_url?: string | null
          stamps_limit?: number | null
          stamps_with_circle?: boolean
          terms_and_conditions?: string | null
          updated_at?: string | null
        }
        Update: {
          builder_done?: boolean
          business_id?: string | null
          catalog_id?: string | null
          created_at?: string | null
          death_expiration_days?: number | null
          death_expiration_enabled?: boolean | null
          description?: string | null
          google_logo_url?: string | null
          gradient_end_color?: string | null
          gradient_start_color?: string | null
          hero_image_url?: string | null
          id?: string
          is_active?: boolean | null
          location_id?: string | null
          logo_position?: string | null
          logo_url?: string | null
          name?: string
          notification_url?: string | null
          pass_background_color?: string | null
          pass_text_color?: string | null
          prefilled_stamps?: number
          prepaid_amount?: number | null
          require_date_of_birth?: boolean | null
          require_email?: boolean | null
          require_first_name?: boolean | null
          require_last_name?: boolean | null
          require_phone?: boolean | null
          reset_expiration_days?: number | null
          reset_expiration_enabled?: boolean | null
          rewards_type?: string
          stamp_color?: string | null
          stamp_style?: string | null
          stamps_icon_url?: string | null
          stamps_limit?: number | null
          stamps_with_circle?: boolean
          terms_and_conditions?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_clubs_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_clubs_catalog_id_fkey"
            columns: ["catalog_id"]
            isOneToOne: true
            referencedRelation: "catalogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_clubs_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      pass_device_tokens: {
        Row: {
          authentication_token: string
          created_at: string | null
          customer_membership_id: string | null
          device_library_identifier: string
          device_model: string | null
          device_token: string
          id: string
          is_active: boolean | null
          pass_type_identifier: string
          serial_number: string
          updated_at: string | null
        }
        Insert: {
          authentication_token: string
          created_at?: string | null
          customer_membership_id?: string | null
          device_library_identifier: string
          device_model?: string | null
          device_token: string
          id?: string
          is_active?: boolean | null
          pass_type_identifier: string
          serial_number: string
          updated_at?: string | null
        }
        Update: {
          authentication_token?: string
          created_at?: string | null
          customer_membership_id?: string | null
          device_library_identifier?: string
          device_model?: string | null
          device_token?: string
          id?: string
          is_active?: boolean | null
          pass_type_identifier?: string
          serial_number?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pass_device_tokens_customer_membership_id_fkey"
            columns: ["customer_membership_id"]
            isOneToOne: false
            referencedRelation: "loyalty_club_customers"
            referencedColumns: ["id"]
          },
        ]
      }
      passes: {
        Row: {
          authentication_token: string | null
          created_at: string | null
          device_library_identifier: string | null
          google_object_id: string | null
          id: string
          last_marketing_message: string | null
          last_updated: string | null
          loyalty_club_customer_id: string | null
          pass_type_identifier: string | null
          pass_url: string | null
          push_token: string | null
          removed_at: string | null
          serial_number: string | null
          status: Database["public"]["Enums"]["pass_status"]
          wallet_provider: string
        }
        Insert: {
          authentication_token?: string | null
          created_at?: string | null
          device_library_identifier?: string | null
          google_object_id?: string | null
          id?: string
          last_marketing_message?: string | null
          last_updated?: string | null
          loyalty_club_customer_id?: string | null
          pass_type_identifier?: string | null
          pass_url?: string | null
          push_token?: string | null
          removed_at?: string | null
          serial_number?: string | null
          status?: Database["public"]["Enums"]["pass_status"]
          wallet_provider: string
        }
        Update: {
          authentication_token?: string | null
          created_at?: string | null
          device_library_identifier?: string | null
          google_object_id?: string | null
          id?: string
          last_marketing_message?: string | null
          last_updated?: string | null
          loyalty_club_customer_id?: string | null
          pass_type_identifier?: string | null
          pass_url?: string | null
          push_token?: string | null
          removed_at?: string | null
          serial_number?: string | null
          status?: Database["public"]["Enums"]["pass_status"]
          wallet_provider?: string
        }
        Relationships: [
          {
            foreignKeyName: "passes_loyalty_club_customer_id_fkey"
            columns: ["loyalty_club_customer_id"]
            isOneToOne: false
            referencedRelation: "loyalty_club_customers"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount_cents: number
          business_id: string
          created_at: string
          currency: string
          description: string | null
          id: string
          paid_at: string | null
          payment_method_type: string | null
          receipt_url: string | null
          status: string
          stripe_charge_id: string | null
          stripe_invoice_id: string | null
          stripe_payment_intent_id: string | null
          subscription_id: string | null
        }
        Insert: {
          amount_cents: number
          business_id: string
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          paid_at?: string | null
          payment_method_type?: string | null
          receipt_url?: string | null
          status: string
          stripe_charge_id?: string | null
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
        }
        Update: {
          amount_cents?: number
          business_id?: string
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          paid_at?: string | null
          payment_method_type?: string | null
          receipt_url?: string | null
          status?: string
          stripe_charge_id?: string | null
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      push_automations: {
        Row: {
          automation_type: string
          business_id: string
          created_at: string | null
          id: string
          is_enabled: boolean | null
          loyalty_club_id: string | null
          message_template: string
          updated_at: string | null
        }
        Insert: {
          automation_type: string
          business_id: string
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          loyalty_club_id?: string | null
          message_template: string
          updated_at?: string | null
        }
        Update: {
          automation_type?: string
          business_id?: string
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          loyalty_club_id?: string | null
          message_template?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "push_automations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "push_automations_loyalty_club_id_fkey"
            columns: ["loyalty_club_id"]
            isOneToOne: false
            referencedRelation: "loyalty_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      push_message_campaign_logs: {
        Row: {
          campaign_id: string
          created_at: string | null
          customer_membership_id: string
          error_message: string | null
          id: string
          message_sent: string
          pass_identifier: string | null
          sent_at: string | null
          status: string
          wallet_provider: string | null
        }
        Insert: {
          campaign_id: string
          created_at?: string | null
          customer_membership_id: string
          error_message?: string | null
          id?: string
          message_sent: string
          pass_identifier?: string | null
          sent_at?: string | null
          status?: string
          wallet_provider?: string | null
        }
        Update: {
          campaign_id?: string
          created_at?: string | null
          customer_membership_id?: string
          error_message?: string | null
          id?: string
          message_sent?: string
          pass_identifier?: string | null
          sent_at?: string | null
          status?: string
          wallet_provider?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "push_message_campaign_logs_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "push_message_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "push_message_campaign_logs_customer_membership_id_fkey"
            columns: ["customer_membership_id"]
            isOneToOne: false
            referencedRelation: "loyalty_club_customers"
            referencedColumns: ["id"]
          },
        ]
      }
      push_message_campaigns: {
        Row: {
          apple_delivered: number | null
          apple_failed: number | null
          business_id: string
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          google_delivered: number | null
          google_failed: number | null
          id: string
          location_ids: string[] | null
          loyalty_club_ids: string[]
          message_template: string
          name: string | null
          scheduled_for: string | null
          sent_at: string | null
          status: string
          targeted_membership_ids: string[] | null
          template_id: string | null
          timezone: string
          total_targeted: number | null
          updated_at: string | null
        }
        Insert: {
          apple_delivered?: number | null
          apple_failed?: number | null
          business_id: string
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          google_delivered?: number | null
          google_failed?: number | null
          id?: string
          location_ids?: string[] | null
          loyalty_club_ids: string[]
          message_template: string
          name?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string
          targeted_membership_ids?: string[] | null
          template_id?: string | null
          timezone: string
          total_targeted?: number | null
          updated_at?: string | null
        }
        Update: {
          apple_delivered?: number | null
          apple_failed?: number | null
          business_id?: string
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          google_delivered?: number | null
          google_failed?: number | null
          id?: string
          location_ids?: string[] | null
          loyalty_club_ids?: string[]
          message_template?: string
          name?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string
          targeted_membership_ids?: string[] | null
          template_id?: string | null
          timezone?: string
          total_targeted?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "push_message_campaigns_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "push_message_campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "push_message_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      push_message_templates: {
        Row: {
          business_id: string
          category: string
          created_at: string | null
          deleted_at: string | null
          id: string
          last_used_at: string | null
          message: string
          name: string
          status: string
          tags: string[] | null
          updated_at: string | null
          use_count: number | null
        }
        Insert: {
          business_id: string
          category: string
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          last_used_at?: string | null
          message: string
          name: string
          status?: string
          tags?: string[] | null
          updated_at?: string | null
          use_count?: number | null
        }
        Update: {
          business_id?: string
          category?: string
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          last_used_at?: string | null
          message?: string
          name?: string
          status?: string
          tags?: string[] | null
          updated_at?: string | null
          use_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "push_message_templates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      push_notification_logs: {
        Row: {
          apns_response_id: string | null
          created_at: string | null
          custom_data: Json | null
          customer_membership_id: string | null
          delivered_at: string | null
          device_token: string | null
          error_message: string | null
          failed_at: string | null
          id: string
          loyalty_club_id: string | null
          max_retries: number | null
          message: string
          notification_type: string
          retry_count: number | null
          scheduled_at: string | null
          sent_at: string | null
          serial_number: string | null
          status: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          apns_response_id?: string | null
          created_at?: string | null
          custom_data?: Json | null
          customer_membership_id?: string | null
          delivered_at?: string | null
          device_token?: string | null
          error_message?: string | null
          failed_at?: string | null
          id?: string
          loyalty_club_id?: string | null
          max_retries?: number | null
          message: string
          notification_type: string
          retry_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          serial_number?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          apns_response_id?: string | null
          created_at?: string | null
          custom_data?: Json | null
          customer_membership_id?: string | null
          delivered_at?: string | null
          device_token?: string | null
          error_message?: string | null
          failed_at?: string | null
          id?: string
          loyalty_club_id?: string | null
          max_retries?: number | null
          message?: string
          notification_type?: string
          retry_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          serial_number?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "push_notification_logs_customer_membership_id_fkey"
            columns: ["customer_membership_id"]
            isOneToOne: false
            referencedRelation: "loyalty_club_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "push_notification_logs_loyalty_club_id_fkey"
            columns: ["loyalty_club_id"]
            isOneToOne: false
            referencedRelation: "loyalty_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      reward_redemptions: {
        Row: {
          business_id: string | null
          cycle_number: number | null
          expires_at: string | null
          id: string
          loyalty_club_customer_id: string | null
          loyalty_club_reward_id: string
          points_used: number | null
          processed_by: string | null
          redeemed_at: string | null
          redemption_code: string
          status: string | null
          used_at: string | null
        }
        Insert: {
          business_id?: string | null
          cycle_number?: number | null
          expires_at?: string | null
          id?: string
          loyalty_club_customer_id?: string | null
          loyalty_club_reward_id: string
          points_used?: number | null
          processed_by?: string | null
          redeemed_at?: string | null
          redemption_code: string
          status?: string | null
          used_at?: string | null
        }
        Update: {
          business_id?: string | null
          cycle_number?: number | null
          expires_at?: string | null
          id?: string
          loyalty_club_customer_id?: string | null
          loyalty_club_reward_id?: string
          points_used?: number | null
          processed_by?: string | null
          redeemed_at?: string | null
          redemption_code?: string
          status?: string | null
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reward_redemptions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_redemptions_loyalty_club_customer_id_fkey"
            columns: ["loyalty_club_customer_id"]
            isOneToOne: false
            referencedRelation: "loyalty_club_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_redemptions_loyalty_club_reward_id_fkey"
            columns: ["loyalty_club_reward_id"]
            isOneToOne: false
            referencedRelation: "loyalty_club_rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      sign_in_logs: {
        Row: {
          business_id: string | null
          created_at: string
          device: Json | null
          device_id: string | null
          email: string
          geo: Json | null
          id: string
          ip_address: unknown
          is_superadmin: boolean | null
          signed_in_at: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string
          device?: Json | null
          device_id?: string | null
          email: string
          geo?: Json | null
          id?: string
          ip_address?: unknown
          is_superadmin?: boolean | null
          signed_in_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string
          device?: Json | null
          device_id?: string | null
          email?: string
          geo?: Json | null
          id?: string
          ip_address?: unknown
          is_superadmin?: boolean | null
          signed_in_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sign_out_logs: {
        Row: {
          created_at: string
          email: string
          id: string
          ip_address: unknown
          signed_out_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          ip_address?: unknown
          signed_out_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          ip_address?: unknown
          signed_out_at?: string
        }
        Relationships: []
      }
      staff_location_access: {
        Row: {
          created_at: string | null
          id: string
          location_id: string
          staff_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          location_id: string
          staff_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          location_id?: string
          staff_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_location_access_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_location_access_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff_members"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_members: {
        Row: {
          business_id: string | null
          created_at: string | null
          id: string
          invited_at: string | null
          invited_by: string | null
          is_active: boolean | null
          joined_at: string | null
          last_login: string | null
          permissions: Json | null
          role: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          id?: string
          invited_at?: string | null
          invited_by?: string | null
          is_active?: boolean | null
          joined_at?: string | null
          last_login?: string | null
          permissions?: Json | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          id?: string
          invited_at?: string | null
          invited_by?: string | null
          is_active?: boolean | null
          joined_at?: string | null
          last_login?: string | null
          permissions?: Json | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_members_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          ai_email_daily_limit: number | null
          created_at: string
          description: string | null
          environment: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          max_cards: number | null
          max_collaborators: number | null
          max_locations: number | null
          max_mailing_quota: number | null
          max_managers: number | null
          max_stamps: number | null
          name: string
          price_monthly_cents: number
          price_yearly_cents: number
          stripe_price_monthly_id: string | null
          stripe_price_yearly_id: string | null
          stripe_product_id: string
          type: string
          updated_at: string
        }
        Insert: {
          ai_email_daily_limit?: number | null
          created_at?: string
          description?: string | null
          environment?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          max_cards?: number | null
          max_collaborators?: number | null
          max_locations?: number | null
          max_mailing_quota?: number | null
          max_managers?: number | null
          max_stamps?: number | null
          name: string
          price_monthly_cents: number
          price_yearly_cents: number
          stripe_price_monthly_id?: string | null
          stripe_price_yearly_id?: string | null
          stripe_product_id: string
          type?: string
          updated_at?: string
        }
        Update: {
          ai_email_daily_limit?: number | null
          created_at?: string
          description?: string | null
          environment?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          max_cards?: number | null
          max_collaborators?: number | null
          max_locations?: number | null
          max_mailing_quota?: number | null
          max_managers?: number | null
          max_stamps?: number | null
          name?: string
          price_monthly_cents?: number
          price_yearly_cents?: number
          stripe_price_monthly_id?: string | null
          stripe_price_yearly_id?: string | null
          stripe_product_id?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          billing_cycle: string
          cancel_at_period_end: boolean | null
          created_at: string
          current_period_end: string
          current_period_start: string
          id: string
          plan_id: string
          status: string
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          subscription_type: string
          updated_at: string
        }
        Insert: {
          billing_cycle: string
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end: string
          current_period_start: string
          id?: string
          plan_id: string
          status: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          subscription_type?: string
          updated_at?: string
        }
        Update: {
          billing_cycle?: string
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          id?: string
          plan_id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          subscription_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_subscriptions_plan_id"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      superadmins: {
        Row: {
          created_at: string | null
          created_by: string | null
          email: string
          id: string
          is_active: boolean | null
          name: string | null
          permissions: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          name?: string | null
          permissions?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          name?: string | null
          permissions?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          business_id: string | null
          closed_at: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          inquiry_type: string
          last_name: string
          message: string
          page_url: string | null
          phone: string | null
          priority: string | null
          resolved_at: string | null
          status: string
          subject: string | null
          updated_at: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          closed_at?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          inquiry_type: string
          last_name: string
          message: string
          page_url?: string | null
          phone?: string | null
          priority?: string | null
          resolved_at?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          closed_at?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          inquiry_type?: string
          last_name?: string
          message?: string
          page_url?: string | null
          phone?: string | null
          priority?: string | null
          resolved_at?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount_spent: number | null
          business_id: string | null
          created_at: string | null
          customer_id: string | null
          description: string | null
          id: string
          location_id: string | null
          loyalty_club_customer_id: string | null
          metadata: Json | null
          points_earned: number | null
          points_redeemed: number | null
          processed_by: string | null
          receipt_number: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type_enum"]
        }
        Insert: {
          amount_spent?: number | null
          business_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          description?: string | null
          id?: string
          location_id?: string | null
          loyalty_club_customer_id?: string | null
          metadata?: Json | null
          points_earned?: number | null
          points_redeemed?: number | null
          processed_by?: string | null
          receipt_number?: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type_enum"]
        }
        Update: {
          amount_spent?: number | null
          business_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          description?: string | null
          id?: string
          location_id?: string | null
          loyalty_club_customer_id?: string | null
          metadata?: Json | null
          points_earned?: number | null
          points_redeemed?: number | null
          processed_by?: string | null
          receipt_number?: string | null
          transaction_type?: Database["public"]["Enums"]["transaction_type_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "transactions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_loyalty_club_customer_id_fkey"
            columns: ["loyalty_club_customer_id"]
            isOneToOne: false
            referencedRelation: "loyalty_club_customers"
            referencedColumns: ["id"]
          },
        ]
      }
      trial_expiration_queue: {
        Row: {
          attempts: number | null
          business_id: string
          created_at: string
          error_message: string | null
          expires_at: string
          id: string
          last_attempt_at: string | null
          status: string
          trial_tracking_id: string
          updated_at: string
        }
        Insert: {
          attempts?: number | null
          business_id: string
          created_at?: string
          error_message?: string | null
          expires_at: string
          id?: string
          last_attempt_at?: string | null
          status?: string
          trial_tracking_id: string
          updated_at?: string
        }
        Update: {
          attempts?: number | null
          business_id?: string
          created_at?: string
          error_message?: string | null
          expires_at?: string
          id?: string
          last_attempt_at?: string | null
          status?: string
          trial_tracking_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trial_expiration_queue_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trial_expiration_queue_trial_tracking_id_fkey"
            columns: ["trial_tracking_id"]
            isOneToOne: false
            referencedRelation: "trial_tracking"
            referencedColumns: ["id"]
          },
        ]
      }
      trial_tracking: {
        Row: {
          business_id: string
          converted_at: string | null
          converted_to_plan_id: string | null
          converted_to_stripe_subscription_id: string | null
          created_at: string
          id: string
          referrer: string | null
          source_url: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_ends_at: string
          trial_started_at: string
          trial_type: string
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          business_id: string
          converted_at?: string | null
          converted_to_plan_id?: string | null
          converted_to_stripe_subscription_id?: string | null
          created_at?: string
          id?: string
          referrer?: string | null
          source_url: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at: string
          trial_started_at?: string
          trial_type: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          business_id?: string
          converted_at?: string | null
          converted_to_plan_id?: string | null
          converted_to_stripe_subscription_id?: string | null
          created_at?: string
          id?: string
          referrer?: string | null
          source_url?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string
          trial_started_at?: string
          trial_type?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trial_tracking_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trial_tracking_converted_to_plan_id_fkey"
            columns: ["converted_to_plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_events: {
        Row: {
          created_at: string
          error_message: string | null
          event_type: string
          id: string
          payload: Json
          processed: boolean | null
          processed_at: string | null
          retry_count: number | null
          stripe_event_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          event_type: string
          id?: string
          payload: Json
          processed?: boolean | null
          processed_at?: string | null
          retry_count?: number | null
          stripe_event_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          event_type?: string
          id?: string
          payload?: Json
          processed?: boolean | null
          processed_at?: string | null
          retry_count?: number | null
          stripe_event_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_customer_tier: {
        Args: { customer_points: number }
        Returns: string
      }
      create_geofence_notification: {
        Args: {
          p_business_id: string
          p_business_location: Json
          p_distance: number
          p_event_type: string
          p_geofence_radius: number
          p_staff_id: string
          p_staff_location: Json
        }
        Returns: string
      }
      delete_business_geofencing: {
        Args: { p_business_id: string; p_user_id: string }
        Returns: Json
      }
      find_membership_by_qr: {
        Args: { qr_prefix: string }
        Returns: {
          id: string
        }[]
      }
      get_active_addons: {
        Args: { p_stripe_mode?: string }
        Returns: {
          description: string
          environment: string
          id: string
          is_active: boolean
          max_locations: number
          name: string
          price_monthly_cents: number
          price_yearly_cents: number
          stripe_price_monthly_id: string
          stripe_price_yearly_id: string
          stripe_product_id: string
          type: string
        }[]
      }
      get_active_subscription_plans: {
        Args: { p_stripe_mode?: string }
        Returns: {
          created_at: string
          description: string
          features: Json
          id: string
          max_cards: number
          max_stamps: number
          name: string
          price_monthly_cents: number
          price_yearly_cents: number
          stripe_price_monthly_id: string
          stripe_price_yearly_id: string
          stripe_product_id: string
        }[]
      }
      get_apple_passes_for_location: {
        Args: { p_location_id: string }
        Returns: {
          customer_id: string
          loyalty_club_customer_id: string
          pass_id: string
          push_token: string
          serial_number: string
        }[]
      }
      get_apple_wallet_location_data: {
        Args: { p_business_id: string }
        Returns: Json
      }
      get_applicable_automation: {
        Args: {
          p_automation_type: string
          p_business_id: string
          p_loyalty_club_id: string
        }
        Returns: {
          automation_type: string
          business_id: string
          id: string
          is_enabled: boolean
          loyalty_club_id: string
          message_template: string
        }[]
      }
      get_billing_status: {
        Args: { p_business_id: string }
        Returns: {
          current_ai_generations_used: number
          current_collaborators_count: number
          current_locations_count: number
          current_loyalty_clubs_count: number
          current_mailing_used: number
          current_managers_count: number
          current_staff_count: number
          max_ai_generations: number
          max_collaborators: number
          max_locations: number
          max_loyalty_clubs: number
          max_mailing_quota: number
          max_managers: number
          max_staff: number
          plan_billing_cycle: string
          plan_currency: string
          plan_description: string
          plan_features: Json
          plan_id: string
          plan_name: string
          plan_price: number
          plan_stripe_price_id: string
          subscription_cancel_at_period_end: boolean
          subscription_current_period_end: string
          subscription_current_period_start: string
          subscription_id: string
          subscription_status: string
          subscription_stripe_subscription_id: string
          subscription_trial_end: string
          subscription_type: string
        }[]
      }
      get_business_trial_status: {
        Args: { p_business_id: string }
        Returns: {
          can_create_new_trial: boolean
          days_remaining: number
          is_in_trial: boolean
          source_url: string
          trial_ends_at: string
          trial_started_at: string
          trial_status: string
          trial_type: string
        }[]
      }
      get_campaign_recipients: {
        Args: {
          p_business_id: string
          p_filter_criteria?: Json
          p_loyalty_club_id?: string
        }
        Returns: {
          actual_stamps: number
          club_name: string
          customer_id: string
          email: string
          first_name: string
          last_name: string
          level_name: string
          location_email_sender_name: string
          location_name: string
          loyalty_club_customer_id: string
          prepaid_balance: number
          stamps_limit: number
          total_spent: number
          visits_count: number
        }[]
      }
      get_customer_by_id_prefix: {
        Args: { prefix: string }
        Returns: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          loyalty_club: Json
          loyalty_club_id: string
          phone: string
          stamps_visit_count: number
          updated_at: string
        }[]
      }
      get_customer_comeback_analytics: {
        Args: { p_business_id: string; p_days?: number; p_location_id?: string }
        Returns: {
          date: string
          new_customers: number
          returning_transactions: number
        }[]
      }
      get_customer_device_tokens: {
        Args: { p_customer_membership_id: string }
        Returns: Json
      }
      get_customer_membership_data: {
        Args: { p_customer_membership_id: string }
        Returns: {
          actual_stamps: number
          business_id: string
          business_name: string
          created_at: string
          current_level_id: string
          customer_email: string
          customer_first_name: string
          customer_id: string
          customer_last_name: string
          customer_name: string
          customer_phone: string
          google_logo_url: string
          hero_image_url: string
          level_name: string
          logo_url: string
          loyalty_club_description: string
          loyalty_club_id: string
          loyalty_club_name: string
          membership_id: string
          notification_url: string
          pass_background_color: string
          pass_text_color: string
          prefilled_stamps: number
          prepaid_amount: number
          prepaid_balance: number
          rewards_type: string
          stamps_icon_url: string
          stamps_limit: number
          stamps_with_circle: boolean
          terms_and_conditions: string
          total_spend: number
        }[]
      }
      get_customer_membership_with_levels: {
        Args: { p_customer_membership_id: string }
        Returns: {
          actual_stamps: number
          business_id: string
          business_name: string
          created_at: string
          current_level_id: string
          customer_email: string
          customer_first_name: string
          customer_id: string
          customer_last_name: string
          customer_name: string
          customer_phone: string
          google_logo_url: string
          hero_image_url: string
          levels: Json
          logo_url: string
          loyalty_club_description: string
          loyalty_club_id: string
          loyalty_club_name: string
          membership_id: string
          pass_background_color: string
          pass_text_color: string
          prefilled_stamps: number
          prepaid_amount: number
          prepaid_balance: number
          rewards_type: string
          stamps_icon_url: string
          stamps_limit: number
          stamps_with_circle: boolean
          terms_and_conditions: string
          total_spend: number
        }[]
      }
      get_customers_by_location: {
        Args: { p_location_id: string }
        Returns: {
          customer_created_at: string
          customer_id: string
          email: string
          first_name: string
          last_name: string
          last_visit: string
          loyalty_club_name: string
          phone: string
          visit_count: number
        }[]
      }
      get_dashboard_metrics: {
        Args: { p_business_id: string; p_days?: number; p_location_id?: string }
        Returns: {
          recurring_customers: number
          total_customers: number
          total_scans: number
          total_spend: number
        }[]
      }
      get_geofencing_stats: { Args: { p_business_id: string }; Returns: Json }
      get_membership_with_business_info: {
        Args: { p_membership_id: string }
        Returns: {
          actual_stamps: number
          business_currency: string
          club_business_id: string
          club_description: string
          club_google_logo_url: string
          club_hero_image_url: string
          club_id: string
          club_is_active: boolean
          club_logo_url: string
          club_name: string
          club_notification_url: string
          club_pass_background_color: string
          club_pass_text_color: string
          club_prefilled_stamps: number
          club_prepaid_amount: number
          club_rewards_type: string
          club_stamps_icon_url: string
          club_stamps_limit: number
          club_stamps_with_circle: boolean
          club_terms_and_conditions: string
          current_cycle: number
          current_level_id: string
          customer_email: string
          customer_first_name: string
          customer_id: string
          customer_last_name: string
          death_expiration_date: string
          is_active: boolean
          level_total_spend: number
          loyalty_club_id: string
          membership_created_at: string
          membership_id: string
          membership_updated_at: string
          prepaid_balance: number
          reset_expiration_date: string
          stamps_visit_count: number
          total_spend: number
        }[]
      }
      get_recent_activity: {
        Args: { p_business_id: string; p_limit?: number }
        Returns: {
          created_at: string
          customer_email: string
          customer_id: string
          customer_name: string
          description: string
          event_subtype: string
          event_type: string
          id: string
          metadata: Json
        }[]
      }
      get_registration_link_by_business_and_slug: {
        Args: { p_business_slug: string; p_link_slug: string }
        Returns: {
          business_id: string
          business_name: string
          business_slug: string
          description: string
          id: string
          is_active: boolean
          loyalty_club_id: string
          loyalty_club_name: string
          name: string
          slug: string
        }[]
      }
      get_registration_link_by_short_code: {
        Args: { code: string }
        Returns: {
          business_slug: string
          description: string
          id: string
          is_active: boolean
          loyalty_club_id: string
          name: string
          short_code: string
          slug: string
        }[]
      }
      get_staff_with_metrics: {
        Args: { p_business_id: string }
        Returns: {
          business_id: string
          created_at: string
          id: string
          is_active: boolean
          role: string
          total_scans: number
          updated_at: string
          user_id: string
        }[]
      }
      get_trial_analytics: {
        Args: { p_end_date?: string; p_start_date?: string }
        Returns: {
          active_trials: number
          avg_days_to_convert_with_card: number
          avg_days_to_convert_without_card: number
          cancelled_trials: number
          conversion_rate_with_card: number
          conversion_rate_without_card: number
          conversions_by_source: Json
          conversions_with_card: number
          conversions_without_card: number
          expired_trials: number
          overall_conversion_rate: number
          total_conversions: number
          total_trials: number
          trials_by_source: Json
          trials_with_card: number
          trials_without_card: number
        }[]
      }
      get_trials_expiring_soon: {
        Args: { p_days_threshold?: number }
        Returns: {
          business_id: string
          business_name: string
          days_remaining: number
          owner_email: string
          trial_ends_at: string
          trial_type: string
        }[]
      }
      get_user_businesses: {
        Args: never
        Returns: {
          business_id: string
        }[]
      }
      get_user_locations: {
        Args: never
        Returns: {
          location_id: string
        }[]
      }
      get_visits_by_day_of_week: {
        Args: {
          p_business_id: string
          p_days?: number
          p_location_id?: string
          p_timezone?: string
        }
        Returns: {
          day: number
          day_label: string
          value: number
        }[]
      }
      increment_ai_usage: {
        Args: {
          p_business_id: string
          p_completion_tokens?: number
          p_date: string
          p_prompt_tokens?: number
        }
        Returns: undefined
      }
      increment_registration_link_conversions: {
        Args: { link_slug: string }
        Returns: undefined
      }
      increment_registration_link_conversions_v2: {
        Args: { p_business_slug: string; p_link_slug: string }
        Returns: undefined
      }
      increment_registration_link_views: {
        Args: { link_slug: string }
        Returns: undefined
      }
      increment_registration_link_views_v2: {
        Args: { p_business_slug: string; p_link_slug: string }
        Returns: undefined
      }
      increment_template_usage: {
        Args: { p_template_id: string }
        Returns: undefined
      }
      is_superadmin: { Args: { user_uuid: string }; Returns: boolean }
      process_expired_trials: {
        Args: never
        Returns: {
          failed_count: number
          processed_business_ids: string[]
          processed_count: number
        }[]
      }
      register_pass_device: {
        Args: {
          p_authentication_token: string
          p_customer_membership_id: string
          p_device_library_identifier: string
          p_device_model?: string
          p_device_token: string
          p_pass_type_identifier: string
          p_serial_number: string
        }
        Returns: Json
      }
      retry_failed_trial_expirations: {
        Args: { p_max_attempts?: number }
        Returns: number
      }
      soft_delete_location: { Args: { p_location_id: string }; Returns: Json }
      unregister_pass_device: {
        Args: { p_device_token: string; p_serial_number: string }
        Returns: Json
      }
      update_business_geofencing: {
        Args: {
          p_business_id: string
          p_geopush_max_distance: number
          p_geopush_message: string
          p_location_lat: number
          p_location_lng: number
          p_user_id: string
        }
        Returns: Json
      }
      user_has_business_access: {
        Args: { p_business_id: string }
        Returns: boolean
      }
      user_has_location_access: {
        Args: { location_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      pass_status: "active" | "removed" | "expired"
      transaction_type_enum:
        | "new_stamp"
        | "reward_completed"
        | "spend_level"
        | "spend_prepaid"
        | "refund"
        | "manual_adjustment"
        | "level_up"
        | "reward_earned"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      pass_status: ["active", "removed", "expired"],
      transaction_type_enum: [
        "new_stamp",
        "reward_completed",
        "spend_level",
        "spend_prepaid",
        "refund",
        "manual_adjustment",
        "level_up",
        "reward_earned",
      ],
    },
  },
} as const
