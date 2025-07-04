'use client';
import { useReactToPrint } from 'react-to-print'

export default function PrintButton({contentRef, title}) {
  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: title || 'Printed Content',
  })
  return (
    <button
      onClick={() => handlePrint()}
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 1000,
        padding: '8px 16px',
        background: '#0070f3',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
      }}
    >
      Print Page
    </button>
  )
}
