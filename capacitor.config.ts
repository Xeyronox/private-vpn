
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.818bd0396a9d45cb980e122ca7657ed4',
  appName: 'private-vpn',
  webDir: 'dist',
  server: {
    url: 'https://818bd039-6a9d-45cb-980e-122ca7657ed4.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0F1419',
      showSpinner: false
    }
  }
};

export default config;
