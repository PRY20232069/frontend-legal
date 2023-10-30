interface ISentence {
  page: number;
  index: number; // Para que se muestre en el orden correcto. Aunque se puede manejar en el backend.
  description: string;
  interpretation: string;
  consumer_protection_law: string;
}

export default interface IDocumentAnalysis {
  id: number;
  title: string;
  bank_name: string;
  num_pages: number;
  sentences: ISentence[];
}
