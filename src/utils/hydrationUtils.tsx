"use client";
import { useEffect } from "react";

// Custom hook to handle hydration issues
export function useHydrationFix() {
  useEffect(() => {
    // Force a single re-render after hydration to sync client and server
    const handleHydration = () => {
      // Remove all extension attributes that might cause hydration mismatches
      const problematicSelectors = [
        '[bis_skin_checked]',
        '[bis_register]', 
        '[data-bis]',
        '[data-adblockkey]',
        '[data-darkreader-mode]',
        '[data-darkreader-scheme]',
        '[cz-shortcut-listen]'
      ];
      
      problematicSelectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            const attrName = selector.slice(1, -1); // Remove [ and ]
            el.removeAttribute(attrName);
          });
        } catch (e) {
          // Silently ignore
        }
      });
    };

    // Multiple cleanup attempts
    setTimeout(handleHydration, 0);
    setTimeout(handleHydration, 10);
    setTimeout(handleHydration, 100);
    
    // Set up continuous monitoring
    const interval = setInterval(handleHydration, 1000);
    
    return () => clearInterval(interval);
  }, []);
}

// Component to wrap problematic elements
export function HydrationSafeDiv({ children, className, ...props }: any) {
  useHydrationFix();
  
  return (
    <div 
      className={className} 
      suppressHydrationWarning={true}
      {...props}
    >
      {children}
    </div>
  );
}