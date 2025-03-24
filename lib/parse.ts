import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// 将Markdown转换为HTML字符串
export async function getFileContent(file: File) {
  console.log(file.name);
  const loader = new PDFLoader(file, {
    splitPages: false,
  });
  const docs = await loader.load();
  return {
    markdown: docs[0].pageContent,
  };
}
