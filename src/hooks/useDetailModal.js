import { useState, useCallback, useEffect } from 'react';

export function useDetailModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openModal = useCallback((series) => {
    setSelectedItem(series);
    setIsOpen(true);
    // Prevent body scroll when modal open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedItem(null);
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }, []);

  // Handle backdrop click (only for desktop modal)
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }, [closeModal]);

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen, closeModal]);

  // Auto-close on mobile swipe down (simulate bottom sheet behavior)
  useEffect(() => {
    if (!isMobile || !isOpen) return;

    let startY = 0;
    let currentY = 0;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      currentY = startY;
    };

    const handleTouchMove = (e) => {
      currentY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const distance = currentY - startY;
      // Swipe down more than 100px to close
      if (distance > 100) {
        closeModal();
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, isOpen, closeModal]);

  return {
    isOpen,
    selectedItem,
    isMobile,
    openModal,
    closeModal,
    handleBackdropClick,
  };
}