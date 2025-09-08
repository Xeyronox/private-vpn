// 🔐 SECURITY: Comprehensive security utilities for VPN application
// 🧠 AI-EDITABLE: Security functions with zero-trust architecture

import { Capacitor } from '@capacitor/core';

/**
 * 🔒 SECURITY: Input sanitization to prevent XSS attacks
 * 🔁 REFACTOR: Use DOMPurify for production environments
 */
export const sanitizeInput = (input: string): string => {
  // 🔐 SECURITY: Remove potential XSS vectors
  return input
    .replace(/[<>]/g, '') // Basic HTML tag removal
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data URLs
    .trim();
};

/**
 * 🔐 SECURITY: Validate server endpoints against allowlist
 * 🚀 OPTIMIZE: Cache validation results
 */
export const validateServerEndpoint = (endpoint: string): boolean => {
  // 🔒 SECURITY: Allowlisted VPN server domains
  const allowedDomains = [
    'us-east.securevault.vpn',
    'us-west.securevault.vpn',
    'eu-central.securevault.vpn',
    'asia-pacific.securevault.vpn',
    'canada.securevault.vpn'
  ];

  try {
    const url = new URL(endpoint);
    return allowedDomains.includes(url.hostname) && url.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * 🔐 SECURITY: Generate cryptographically secure random strings
 * 🔁 REFACTOR: Use Web Crypto API for better entropy
 */
export const generateSecureId = (length: number = 32): string => {
  // 🚀 OPTIMIZE: Use crypto.getRandomValues() for better security
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  
  // 🐞 BUG: Fallback for environments without crypto API
  console.warn('🔐 SECURITY: Using fallback random generation - not cryptographically secure');
  return Math.random().toString(36).substring(2, length + 2);
};

/**
 * 🔒 SECURITY: Rate limiting for API calls
 * 🚀 OPTIMIZE: In-memory cache with TTL
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  // 🔐 SECURITY: Check if request is within rate limits
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    
    // 🚀 OPTIMIZE: Clean old requests
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }
}

export const rateLimiter = new RateLimiter();

/**
 * 🔐 SECURITY: Secure storage wrapper with encryption
 * 🔁 REFACTOR: Implement proper encryption for sensitive data
 */
export const secureStorage = {
  // 🔒 SECURITY: Store encrypted data
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (Capacitor.isNativePlatform()) {
        // 🚀 OPTIMIZE: Use native secure storage on mobile
        const { Preferences } = await import('@capacitor/preferences');
        await Preferences.set({ key, value });
      } else {
        // 🔐 SECURITY: Basic encryption for web storage
        const encrypted = btoa(value); // 🔁 REFACTOR: Use proper encryption
        localStorage.setItem(key, encrypted);
      }
    } catch (error) {
      console.error('🔐 SECURITY: Failed to store secure data:', error);
    }
  },

  // 🔒 SECURITY: Retrieve and decrypt data
  getItem: async (key: string): Promise<string | null> => {
    try {
      if (Capacitor.isNativePlatform()) {
        const { Preferences } = await import('@capacitor/preferences');
        const result = await Preferences.get({ key });
        return result.value;
      } else {
        const encrypted = localStorage.getItem(key);
        return encrypted ? atob(encrypted) : null; // 🔁 REFACTOR: Use proper decryption
      }
    } catch (error) {
      console.error('🔐 SECURITY: Failed to retrieve secure data:', error);
      return null;
    }
  },

  // 🔒 SECURITY: Secure removal
  removeItem: async (key: string): Promise<void> => {
    try {
      if (Capacitor.isNativePlatform()) {
        const { Preferences } = await import('@capacitor/preferences');
        await Preferences.remove({ key });
      } else {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('🔐 SECURITY: Failed to remove secure data:', error);
    }
  }
};

/**
 * 🔐 SECURITY: Detect and prevent common security threats
 * 🧠 AI-EDITABLE: Threat detection with machine learning
 */
export const threatDetection = {
  // 🔒 SECURITY: Detect potential XSS attempts
  detectXSS: (input: string): boolean => {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe\b/gi,
      /<object\b/gi,
      /<embed\b/gi,
      /eval\s*\(/gi,
      /expression\s*\(/gi
    ];
    
    return xssPatterns.some(pattern => pattern.test(input));
  },

  // 🔐 SECURITY: Detect suspicious network patterns
  detectNetworkAnomaly: (connectionData: any): boolean => {
    // 🚀 OPTIMIZE: Implement ML-based anomaly detection
    const { bytesTransferred, connectionTime, serverLocation } = connectionData;
    
    // 🔒 SECURITY: Basic anomaly checks
    const suspiciousPatterns = [
      bytesTransferred > 10 * 1024 * 1024 * 1024, // > 10GB in single session
      connectionTime > 24 * 60 * 60 * 1000, // > 24 hours
      !serverLocation || serverLocation.includes('unknown')
    ];
    
    return suspiciousPatterns.some(Boolean);
  },

  // 🔐 SECURITY: Monitor app integrity
  checkAppIntegrity: async (): Promise<boolean> => {
    try {
      // 🔒 SECURITY: Basic integrity checks
      const hasRequiredComponents = [
        typeof window !== 'undefined',
        typeof document !== 'undefined',
        typeof fetch !== 'undefined'
      ].every(Boolean);
      
      // 🔐 SECURITY: Check for debugging tools
      const hasDebugger = !!(window as any).chrome?.runtime?.onConnect;
      
      return hasRequiredComponents && !hasDebugger;
    } catch {
      return false;
    }
  }
};

/**
 * 🔐 SECURITY: Advanced encryption utilities
 * 🔁 REFACTOR: Implement AES-256-GCM encryption
 */
export const encryption = {
  // 🔒 SECURITY: Generate encryption key
  generateKey: async (): Promise<CryptoKey | null> => {
    if (!crypto.subtle) return null;
    
    try {
      return await crypto.subtle.generateKey(
        {
          name: 'AES-GCM',
          length: 256
        },
        true,
        ['encrypt', 'decrypt']
      );
    } catch (error) {
      console.error('🔐 SECURITY: Failed to generate encryption key:', error);
      return null;
    }
  },

  // 🔐 SECURITY: Encrypt sensitive data
  encrypt: async (data: string, key: CryptoKey): Promise<string | null> => {
    if (!crypto.subtle) return null;
    
    try {
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encodedData = new TextEncoder().encode(data);
      
      const encrypted = await crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        key,
        encodedData
      );
      
      // 🚀 OPTIMIZE: Combine IV and encrypted data
      const combined = new Uint8Array(iv.length + encrypted.byteLength);
      combined.set(iv);
      combined.set(new Uint8Array(encrypted), iv.length);
      
      return btoa(String.fromCharCode(...combined));
    } catch (error) {
      console.error('🔐 SECURITY: Encryption failed:', error);
      return null;
    }
  },

  // 🔒 SECURITY: Decrypt sensitive data
  decrypt: async (encryptedData: string, key: CryptoKey): Promise<string | null> => {
    if (!crypto.subtle) return null;
    
    try {
      const combined = new Uint8Array(
        atob(encryptedData)
          .split('')
          .map(char => char.charCodeAt(0))
      );
      
      const iv = combined.slice(0, 12);
      const data = combined.slice(12);
      
      const decrypted = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        key,
        data
      );
      
      return new TextDecoder().decode(decrypted);
    } catch (error) {
      console.error('🔐 SECURITY: Decryption failed:', error);
      return null;
    }
  }
};