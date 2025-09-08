// 🚀 OPTIMIZE: Performance monitoring and optimization utilities
// 🧠 AI-EDITABLE: Performance tracking with real-time analytics

/**
 * 🚀 OPTIMIZE: Performance monitoring with Web Vitals
 * 🔁 REFACTOR: Implement comprehensive performance tracking
 */
export class PerformanceMonitor {
  private metrics: Map<string, number> = new Map();
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  // 🚀 OPTIMIZE: Initialize performance observers
  private initializeObservers(): void {
    try {
      // 🔁 REFACTOR: Monitor Long Tasks
      if ('PerformanceObserver' in window) {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            console.warn(`🐢 PERFORMANCE: Long task detected: ${entry.duration}ms`);
            this.metrics.set('longTaskDuration', entry.duration);
          });
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });
        this.observers.push(longTaskObserver);

        // 🚀 OPTIMIZE: Monitor Layout Shift
        const layoutShiftObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (entry.value > 0.1) {
              console.warn(`🐢 PERFORMANCE: Layout shift detected: ${entry.value}`);
              this.metrics.set('cumulativeLayoutShift', entry.value);
            }
          });
        });
        layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(layoutShiftObserver);

        // 🔁 REFACTOR: Monitor Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            this.metrics.set('largestContentfulPaint', entry.startTime);
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      }
    } catch (error) {
      console.error('🐞 BUG: Failed to initialize performance observers:', error);
    }
  }

  // 🚀 OPTIMIZE: Measure function execution time
  measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const startTime = performance.now();
      
      try {
        const result = await fn();
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        this.metrics.set(name, duration);
        
        // 🔁 REFACTOR: Log slow operations
        if (duration > 1000) {
          console.warn(`🐢 PERFORMANCE: Slow operation "${name}": ${duration.toFixed(2)}ms`);
        }
        
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  // 🚀 OPTIMIZE: Measure synchronous function execution
  measure<T>(name: string, fn: () => T): T {
    const startTime = performance.now();
    const result = fn();
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    this.metrics.set(name, duration);
    
    if (duration > 100) {
      console.warn(`🐢 PERFORMANCE: Slow sync operation "${name}": ${duration.toFixed(2)}ms`);
    }
    
    return result;
  }

  // 🔁 REFACTOR: Get performance report
  getReport(): Record<string, any> {
    const report: Record<string, any> = {
      timestamp: new Date().toISOString(),
      metrics: Object.fromEntries(this.metrics),
      navigation: this.getNavigationMetrics(),
      memory: this.getMemoryMetrics(),
      connection: this.getConnectionMetrics()
    };

    return report;
  }

  // 🚀 OPTIMIZE: Get navigation timing metrics
  private getNavigationMetrics(): Record<string, number> {
    if (!performance.navigation || !performance.timing) {
      return {};
    }

    const timing = performance.timing;
    return {
      domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
      loadComplete: timing.loadEventEnd - timing.navigationStart,
      domInteractive: timing.domInteractive - timing.navigationStart,
      firstByte: timing.responseStart - timing.navigationStart
    };
  }

  // 🔁 REFACTOR: Get memory usage metrics
  private getMemoryMetrics(): Record<string, number> {
    if (!(performance as any).memory) {
      return {};
    }

    const memory = (performance as any).memory;
    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit
    };
  }

  // 🚀 OPTIMIZE: Get connection metrics
  private getConnectionMetrics(): Record<string, any> {
    if (!(navigator as any).connection) {
      return {};
    }

    const connection = (navigator as any).connection;
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    };
  }

  // 🔁 REFACTOR: Cleanup observers
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

/**
 * 🚀 OPTIMIZE: Resource loading optimization
 * 🔁 REFACTOR: Lazy loading with intersection observer
 */
export class ResourceOptimizer {
  private imageObserver: IntersectionObserver | null = null;
  private prefetchQueue: string[] = [];

  constructor() {
    this.initializeLazyLoading();
  }

  // 🚀 OPTIMIZE: Initialize lazy loading for images
  private initializeLazyLoading(): void {
    if ('IntersectionObserver' in window) {
      this.imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              const src = img.dataset.src;
              
              if (src) {
                img.src = src;
                img.removeAttribute('data-src');
                this.imageObserver?.unobserve(img);
              }
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01
        }
      );
    }
  }

  // 🔁 REFACTOR: Register image for lazy loading
  registerLazyImage(img: HTMLImageElement): void {
    if (this.imageObserver) {
      this.imageObserver.observe(img);
    }
  }

  // 🚀 OPTIMIZE: Prefetch critical resources
  prefetchResource(url: string): void {
    if (this.prefetchQueue.includes(url)) return;
    
    this.prefetchQueue.push(url);
    
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.onload = () => {
      console.log(`🚀 OPTIMIZE: Prefetched resource: ${url}`);
    };
    link.onerror = () => {
      console.warn(`🐞 BUG: Failed to prefetch: ${url}`);
    };
    
    document.head.appendChild(link);
  }

  // 🔁 REFACTOR: Preload critical resources
  preloadResource(url: string, type: 'script' | 'style' | 'image' | 'font' = 'script'): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    
    switch (type) {
      case 'script':
        link.as = 'script';
        break;
      case 'style':
        link.as = 'style';
        break;
      case 'image':
        link.as = 'image';
        break;
      case 'font':
        link.as = 'font';
        link.crossOrigin = 'anonymous';
        break;
    }
    
    document.head.appendChild(link);
  }

  // 🚀 OPTIMIZE: Cleanup resources
  cleanup(): void {
    if (this.imageObserver) {
      this.imageObserver.disconnect();
      this.imageObserver = null;
    }
    this.prefetchQueue = [];
  }
}

/**
 * 🔁 REFACTOR: Bundle size analyzer
 * 🚀 OPTIMIZE: Track and optimize bundle sizes
 */
export const bundleAnalyzer = {
  // 🔁 REFACTOR: Analyze chunk sizes
  analyzeChunks: (): Record<string, number> => {
    const chunks: Record<string, number> = {};
    
    // 🚀 OPTIMIZE: Get script sizes
    document.querySelectorAll('script[src]').forEach((script: any) => {
      const src = script.src;
      const name = src.split('/').pop() || 'unknown';
      
      fetch(src, { method: 'HEAD' })
        .then(response => {
          const size = response.headers.get('content-length');
          if (size) {
            chunks[name] = parseInt(size, 10);
          }
        })
        .catch(() => {
          // 🐞 BUG: Handle fetch errors silently
        });
    });
    
    return chunks;
  },

  // 🚀 OPTIMIZE: Recommend optimizations
  getOptimizationSuggestions: (): string[] => {
    const suggestions: string[] = [];
    
    // 🔁 REFACTOR: Check for large images
    document.querySelectorAll('img').forEach(img => {
      if (img.naturalWidth > 1920 || img.naturalHeight > 1080) {
        suggestions.push(`🖼️ OPTIMIZE: Large image detected: ${img.src}`);
      }
    });
    
    // 🚀 OPTIMIZE: Check for render-blocking resources
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      if (!link.hasAttribute('media')) {
        suggestions.push(`🎨 OPTIMIZE: Non-critical CSS should be loaded asynchronously: ${(link as any).href}`);
      }
    });
    
    return suggestions;
  }
};

// 🚀 OPTIMIZE: Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();
export const resourceOptimizer = new ResourceOptimizer();

// 🔁 REFACTOR: Auto-cleanup on page unload
window.addEventListener('beforeunload', () => {
  performanceMonitor.cleanup();
  resourceOptimizer.cleanup();
});