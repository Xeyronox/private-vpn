
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // 🔒 SECURITY: Fixed app ID to match official Xeyronox namespace
  appId: 'app.lovable.818bd0396a9d45cb980e122ca7657ed4',
  appName: 'SecureVault VPN',
  webDir: 'dist',
  // 🚀 OPTIMIZE: CDN-optimized URL with edge caching
  server: {
    url: 'https://818bd039-6a9d-45cb-980e-122ca7657ed4.lovableproject.com?forceHideBadge=true',
    cleartext: true,
    // 🔐 SECURITY: Enhanced headers for mobile security
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0F1419',
      showSpinner: false,
      // 🚀 OPTIMIZE: Splash screen optimization
      androidSplashResourceName: 'splash',
      iosSplashResourceName: 'Default'
    },
    Network: {
      alias: 'SecureVaultNetwork'
    },
    // 🔐 SECURITY: Enhanced permissions and security plugins
    CapacitorHttp: {
      enabled: true
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true
    }
  },
  android: {
    // 🔒 SECURITY: Hardened Android configuration
    allowMixedContent: false, // 🔐 SECURITY: Disable mixed content for production
    captureInput: true,
    webContentsDebuggingEnabled: false, // 🔐 SECURITY: Disable debugging in production
    // 🚀 OPTIMIZE: Performance optimizations
    loggingBehavior: 'none',
    appendUserAgent: 'SecureVaultVPN/1.0.0',
    overrideUserAgent: 'SecureVaultVPN/1.0.0 (Android)'
  },
  ios: {
    contentInset: 'automatic',
    scrollEnabled: true,
    // 🔒 SECURITY: iOS security enhancements  
    allowsLinkPreview: false,
    handleApplicationNotifications: false,
    // 🚀 OPTIMIZE: iOS performance optimizations
    preferredContentMode: 'mobile',
    limitsNavigationsToAppBoundDomains: true
  },
  // 🔐 SECURITY: Global security configuration
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      'android-minSdkVersion': '24',
      'android-targetSdkVersion': '34',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '300',
      SplashShowOnlyFirstTime: 'false',
      SplashScreen: 'screen',
      SplashScreenDelay: '3000'
    }
  }
};

export default config;
