"use client";
import { useEffect, useRef } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cleanupRef = useRef<boolean>(false);

  useEffect(() => {
    // Clean up browser extension attributes that cause hydration errors
    const cleanupExtensionAttributes = () => {
      if (cleanupRef.current) return;
      
      // List of problematic attributes from browser extensions
      const extensionAttributes = [
        'bis_skin_checked',
        'bis_register', 
        'data-bis',
        'data-adblockkey',
        'data-darkreader-mode',
        'data-darkreader-scheme',
        'cz-shortcut-listen'
      ];
      
      extensionAttributes.forEach(attr => {
        const elements = document.querySelectorAll(`[${attr}]`);
        elements.forEach(element => {
          try {
            element.removeAttribute(attr);
          } catch (e) {
            // Silently ignore errors
          }
        });
      });
      
      // Special handling for hidden divs with bis_skin_checked
      const hiddenDivs = document.querySelectorAll('div[hidden="true"][bis_skin_checked]');
      hiddenDivs.forEach(div => {
        try {
          div.removeAttribute('bis_skin_checked');
        } catch (e) {
          // Silently ignore errors
        }
      });
    };

    // Multiple cleanup strategies
    const timeouts = [
      setTimeout(cleanupExtensionAttributes, 0),
      setTimeout(cleanupExtensionAttributes, 100),
      setTimeout(cleanupExtensionAttributes, 500),
      setTimeout(cleanupExtensionAttributes, 1000)
    ];
    
    // Mutation observer for dynamic cleanup
    const observer = new MutationObserver((mutations) => {
      if (cleanupRef.current) return;
      
      let shouldCleanup = false;
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName?.includes('bis_') || 
             mutation.attributeName?.includes('data-'))) {
          shouldCleanup = true;
        }
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldCleanup = true;
        }
      });
      
      if (shouldCleanup) {
        setTimeout(cleanupExtensionAttributes, 10);
      }
    });
    
    if (document.body) {
      observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }

    return () => {
      cleanupRef.current = true;
      timeouts.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}