'use client'
import React, { createContext, useContext } from 'react';

export const PageTitleContext = createContext('');

export function usePageTitle() {
  return useContext(PageTitleContext);
}

export function PageTitleProvider({ title, children }) {
  return (
    <PageTitleContext.Provider value={title}>
      {children}
    </PageTitleContext.Provider>
  );
}
