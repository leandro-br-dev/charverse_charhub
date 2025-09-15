import type { SupportedLocale, Namespace } from './index';

// Resource mapping for static/fallback translations
export const resources = {
  en: {
    common: {
      // UI Elements
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',

      // Actions
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      update: 'Update',
      confirm: 'Confirm',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      reset: 'Reset',
      search: 'Search',
      clear: 'Clear',

      // Form Elements
      required: 'Required',
      optional: 'Optional',
      placeholder: 'Enter...',
      select: 'Select an option',

      // Status
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending',
      completed: 'Completed',
      draft: 'Draft',
      published: 'Published',

      // Time
      today: 'Today',
      yesterday: 'Yesterday',
      tomorrow: 'Tomorrow',
      now: 'Now',

      // Navigation
      home: 'Home',
      dashboard: 'Dashboard',
      settings: 'Settings',
      profile: 'Profile',
      help: 'Help',
      about: 'About',
    },

    navigation: {
      // Header
      brand: 'CharVerse',
      menu: 'Menu',

      // Main Navigation
      characters: 'Characters',
      stories: 'Stories',
      chat: 'Chat',
      playground: 'Playground',

      // User Menu
      myProfile: 'My Profile',
      accountSettings: 'Account Settings',
      billing: 'Billing',
      logout: 'Logout',

      // Mobile
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },

    auth: {
      // Login
      login: 'Login',
      loginTitle: 'Sign in to your account',
      loginSubtitle: 'Welcome back! Please enter your details.',
      email: 'Email',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot your password?',

      // Register
      register: 'Register',
      registerTitle: 'Create your account',
      registerSubtitle: 'Join CharVerse and start your creative journey.',
      fullName: 'Full Name',
      confirmPassword: 'Confirm Password',
      agreeToTerms: 'I agree to the Terms of Service and Privacy Policy',

      // Common
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",

      // Validation
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 8 characters',
      passwordsNoMatch: 'Passwords do not match',
      nameRequired: 'Full name is required',
      termsRequired: 'You must agree to the terms',
    },

    home: {
      // Hero Section
      heroTitle: 'Create Amazing AI Characters',
      heroSubtitle: 'Bring your imagination to life with our advanced AI character creation platform.',
      getStarted: 'Get Started',
      learnMore: 'Learn More',

      // Features
      featuresTitle: 'Powerful Features',
      featuresSubtitle: 'Everything you need to create and manage AI characters.',

      // CTA
      ctaTitle: 'Ready to start creating?',
      ctaSubtitle: 'Join thousands of creators building amazing AI characters.',
      ctaButton: 'Start Creating Now',
    },

    dashboard: {
      // Header
      title: 'Dashboard',
      welcome: 'Welcome back, {{name}}!',

      // Stats
      totalCharacters: 'Total Characters',
      totalStories: 'Total Stories',
      totalInteractions: 'Total Interactions',
      creditsRemaining: 'Credits Remaining',

      // Quick Actions
      quickActions: 'Quick Actions',
      createCharacter: 'Create Character',
      createStory: 'Create Story',
      startChat: 'Start Chat',

      // Recent Activity
      recentActivity: 'Recent Activity',
      noActivity: 'No recent activity',
    },

    errors: {
      // Network Errors
      networkError: 'Network error. Please check your connection.',
      serverError: 'Server error. Please try again later.',
      notFound: 'The requested resource was not found.',
      unauthorized: 'You are not authorized to access this resource.',
      forbidden: 'Access to this resource is forbidden.',

      // Validation Errors
      validationError: 'Please check your input and try again.',
      requiredField: 'This field is required.',
      invalidFormat: 'Invalid format.',

      // Generic
      somethingWentWrong: 'Something went wrong. Please try again.',
      tryAgain: 'Try Again',
      goBack: 'Go Back',
    },

    settings: {
      // General
      title: 'Settings',
      general: 'General',
      account: 'Account',
      privacy: 'Privacy',
      notifications: 'Notifications',

      // Language
      language: 'Language',
      languageDescription: 'Choose your preferred language for the interface.',

      // Theme
      theme: 'Theme',
      themeDescription: 'Choose your preferred color scheme.',
      light: 'Light',
      dark: 'Dark',
      system: 'System',

      // Saved
      settingsSaved: 'Settings saved successfully!',
    },
  },

  pt: {
    common: {
      loading: 'Carregando...',
      error: 'Erro',
      success: 'Sucesso',
      warning: 'Aviso',
      info: 'Informação',

      save: 'Salvar',
      cancel: 'Cancelar',
      delete: 'Excluir',
      edit: 'Editar',
      create: 'Criar',
      update: 'Atualizar',
      confirm: 'Confirmar',
      close: 'Fechar',
      back: 'Voltar',
      next: 'Próximo',
      previous: 'Anterior',
      submit: 'Enviar',
      reset: 'Redefinir',
      search: 'Buscar',
      clear: 'Limpar',

      required: 'Obrigatório',
      optional: 'Opcional',
      placeholder: 'Digite...',
      select: 'Selecione uma opção',

      active: 'Ativo',
      inactive: 'Inativo',
      pending: 'Pendente',
      completed: 'Concluído',
      draft: 'Rascunho',
      published: 'Publicado',

      today: 'Hoje',
      yesterday: 'Ontem',
      tomorrow: 'Amanhã',
      now: 'Agora',

      home: 'Início',
      dashboard: 'Painel',
      settings: 'Configurações',
      profile: 'Perfil',
      help: 'Ajuda',
      about: 'Sobre',
    },

    navigation: {
      brand: 'CharVerse',
      menu: 'Menu',

      characters: 'Personagens',
      stories: 'Histórias',
      chat: 'Chat',
      playground: 'Playground',

      myProfile: 'Meu Perfil',
      accountSettings: 'Configurações da Conta',
      billing: 'Faturamento',
      logout: 'Sair',

      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
    },

    auth: {
      login: 'Entrar',
      loginTitle: 'Entre na sua conta',
      loginSubtitle: 'Bem-vindo de volta! Digite seus dados.',
      email: 'Email',
      password: 'Senha',
      rememberMe: 'Lembrar-me',
      forgotPassword: 'Esqueceu sua senha?',

      register: 'Registrar',
      registerTitle: 'Crie sua conta',
      registerSubtitle: 'Junte-se ao CharVerse e comece sua jornada criativa.',
      fullName: 'Nome Completo',
      confirmPassword: 'Confirmar Senha',
      agreeToTerms: 'Concordo com os Termos de Serviço e Política de Privacidade',

      alreadyHaveAccount: 'Já tem uma conta?',
      dontHaveAccount: 'Não tem uma conta?',

      emailRequired: 'Email é obrigatório',
      emailInvalid: 'Digite um email válido',
      passwordRequired: 'Senha é obrigatória',
      passwordMinLength: 'A senha deve ter pelo menos 8 caracteres',
      passwordsNoMatch: 'As senhas não coincidem',
      nameRequired: 'Nome completo é obrigatório',
      termsRequired: 'Você deve concordar com os termos',
    },

    home: {
      heroTitle: 'Crie Personagens AI Incríveis',
      heroSubtitle: 'Dê vida à sua imaginação com nossa plataforma avançada de criação de personagens AI.',
      getStarted: 'Começar',
      learnMore: 'Saiba Mais',

      featuresTitle: 'Recursos Poderosos',
      featuresSubtitle: 'Tudo que você precisa para criar e gerenciar personagens AI.',

      ctaTitle: 'Pronto para começar a criar?',
      ctaSubtitle: 'Junte-se a milhares de criadores construindo personagens AI incríveis.',
      ctaButton: 'Começar a Criar Agora',
    },

    dashboard: {
      title: 'Painel',
      welcome: 'Bem-vindo de volta, {{name}}!',

      totalCharacters: 'Total de Personagens',
      totalStories: 'Total de Histórias',
      totalInteractions: 'Total de Interações',
      creditsRemaining: 'Créditos Restantes',

      quickActions: 'Ações Rápidas',
      createCharacter: 'Criar Personagem',
      createStory: 'Criar História',
      startChat: 'Iniciar Chat',

      recentActivity: 'Atividade Recente',
      noActivity: 'Nenhuma atividade recente',
    },

    errors: {
      networkError: 'Erro de rede. Verifique sua conexão.',
      serverError: 'Erro do servidor. Tente novamente mais tarde.',
      notFound: 'O recurso solicitado não foi encontrado.',
      unauthorized: 'Você não está autorizado a acessar este recurso.',
      forbidden: 'Acesso a este recurso é proibido.',

      validationError: 'Verifique sua entrada e tente novamente.',
      requiredField: 'Este campo é obrigatório.',
      invalidFormat: 'Formato inválido.',

      somethingWentWrong: 'Algo deu errado. Tente novamente.',
      tryAgain: 'Tentar Novamente',
      goBack: 'Voltar',
    },

    settings: {
      title: 'Configurações',
      general: 'Geral',
      account: 'Conta',
      privacy: 'Privacidade',
      notifications: 'Notificações',

      language: 'Idioma',
      languageDescription: 'Escolha seu idioma preferido para a interface.',

      theme: 'Tema',
      themeDescription: 'Escolha seu esquema de cores preferido.',
      light: 'Claro',
      dark: 'Escuro',
      system: 'Sistema',

      settingsSaved: 'Configurações salvas com sucesso!',
    },
  },
} as const;

// Type for translation keys
export type TranslationKeys = typeof resources.en;

// Helper function to get fallback translations
export const getFallbackTranslation = (
  namespace: Namespace,
  key: string,
  locale: SupportedLocale = 'en'
): string | undefined => {
  const nsResources = resources[locale]?.[namespace] as any;
  return nsResources?.[key];
};

// Helper function to check if translation exists
export const hasTranslation = (
  namespace: Namespace,
  key: string,
  locale: SupportedLocale = 'en'
): boolean => {
  return getFallbackTranslation(namespace, key, locale) !== undefined;
};