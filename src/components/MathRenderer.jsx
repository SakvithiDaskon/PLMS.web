import React, { useMemo } from 'react';
import katex from 'katex';

/**
 * MathRenderer component for rendering KaTeX formulas.
 * @param {string} math - The raw LaTeX expression string.
 * @param {boolean} inline - Whether to render inline ($math$) or display mode ($$math$$).
 * @param {string} className - Optional container styling classes.
 */
export const MathRenderer = ({ math, inline = false, className = '' }) => {
  const html = useMemo(() => {
    if (!math) return '';
    try {
      return katex.renderToString(math, {
        displayMode: !inline,
        throwOnError: false,
        output: 'html',
        trust: true
      });
    } catch (error) {
      console.error('KaTeX error:', error);
      return `<span class="text-rose-400 font-mono text-xs">[Math Error: ${math}]</span>`;
    }
  }, [math, inline]);

  if (inline) {
    return (
      <span
        className={`inline-block px-1 py-0.5 rounded bg-slate-800/80 text-emerald-300 border border-slate-700/60 font-mono text-sm ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div
      className={`my-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-indigo-200 overflow-x-auto shadow-inner text-center ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MathRenderer;
