import pdfMake from 'pdfmake/build/pdfmake.min';
import pdfFonts from '@/vfs_fonts';
// import pdfFonts from "pdfmake/build/vfs_fonts";

import ProcessSpec from '@/spec-parser';
import {
  getInfoDef, getSecurityDef, getApiDef, getApiListDef,
} from '@/pdf-parts-gen';

export default async function createPdf(specUrl, options) {
  const parsedSpec = await ProcessSpec(specUrl, options.pdfSortTags);

  const pdfStyles = {
    title: { fontSize: 32 },
    h1: { fontSize: 22 },
    h2: { fontSize: 20 },
    h3: { fontSize: 18 },
    h4: { fontSize: 16 },
    h5: { fontSize: 14 },
    h6: { fontSize: 12, bold: true },
    p: { fontSize: 12 },
    small: { fontSize: 10 },
    sub: { fontSize: 8 },
    right: { alignment: 'right' },
    left: { alignment: 'left' },
    topMargin1: { margin: [0, 180, 0, 10] },
    topMargin2: { margin: [0, 60, 0, 5] },
    topMargin3: { margin: [0, 20, 0, 3] },
    topMargin4: { margin: [0, 15, 0, 3] },
    topMarginRegular: { margin: [0, 3, 0, 0] },
    tableMargin: { margin: [0, 5, 0, 15] },
    b: { bold: true },
    i: { italics: true },
    primary: { color: (options.pdfPrimaryColor ? options.pdfPrimaryColor : '#be123c') }, // tw-rose-700
    alternate: { color: (options.pdfAlternateColor ? options.pdfAlternateColor : '#1d4ed8') }, // tw-blue-700
    gray: { color: '#737373' }, // tw-neutral-500
    lightGray: { color: '#a3a3a3' }, // tw-neutral-400
    darkGray: { color: '#525252' }, // tw-neutral-600
    red: { color: '#dc2626' }, // tw-red-600
    blue: { color: '#2563eb' }, // tw-blue-600
    mono: { font: 'Mono', fontSize: 10 },
    monoSub: { font: 'Mono', fontSize: 8 },
  };

  const allContent = [];
  let infoDef = {};
  let tocDef = {};
  let securityDef = {};
  let apiListDef = {};
  let apiDef = {};

  if (options.includeInfo) {
    infoDef = getInfoDef(parsedSpec, options.pdfTitle, options.localize);
    allContent.push(infoDef);
  }
  if (options.includeToc) {
    tocDef = {
      toc: {
        title: { text: options.localize.index, style: ['b', 'h2'] },
        numberStyle: { bold: true },
        style: ['small'],
      },
      pageBreak: 'after',
    };
    // allContent.push({text:'', pageBreak:'after'});
    allContent.push(tocDef);
  }
  if (options.includeSecurity) {
    securityDef = getSecurityDef(parsedSpec, options.localize);
    allContent.push(securityDef);
  }
  if (options.includeApiDetails) {
    apiDef = getApiDef(parsedSpec, '', options.pdfSchemaStyle, options.localize, options.includeExample, options.includeApiList);
    allContent.push(apiDef);
  }
  if (options.includeApiList) {
    apiListDef = getApiListDef(parsedSpec, options.localize.apiList, options.localize);
    allContent.push(apiListDef);
  }

  const finalDocDef = {
    footer(currentPage, pageCount) {
      return {
        margin: 10,
        columns: [
          { text: options.pdfFooterText, style: ['sub', 'gray', 'left'] },
          { text: `${currentPage} of ${pageCount}`, style: ['sub', 'gray', 'right'] },
        ],
      };
    },
    defaultStyle: {
      font: 'Inter',
    },
    content: allContent,
    styles: pdfStyles,
  };


  pdfMake.fonts = {
    Inter: {
      normal: 'Inter-Regular.otf',
      italics: 'Inter-Italic.otf',
      bold: 'Inter-Bold.otf',
      bolditalics: 'Inter-BoldItalic.otf',
    },
    Mono: {
      normal: '8f30371GeistMono-Regular.ttf',
      italics: '8f30371GeistMono-Regular.ttf',
      bold: '8f30371GeistMono-Bold.ttf',
      bolditalics: '8f30371GeistMono-Bold.ttf',
    },

  };
  // pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.vfs = pdfFonts;
  pdfMake.createPdf(finalDocDef).open();
}
