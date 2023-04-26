import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow, WidthType, ImageRun, PageOrientation, SectionType } from "docx";

export const handleExportFile = async (imagesData, detailsTableData, furnitureTableData) => {

   const getImagesData = async () => {
      const result = await imagesData;
      return result;
   };

   async function createImages() {
      const imageData = await getImagesData();
      const images = imageData.map((data) => {
         return new ImageRun({
            data: data,
            transformation: {
               width: 200,
               height: 100,
            },
            altText: {
               title: "This is title",
               description: "This is image",
               name: "My Image",
            },
         });
      });
      const paragraphs = images.map((image) => {
         return new Paragraph({
            children: [image],
         });
      });
      return paragraphs;
   }

   const Images = await createImages();

   const ImagesTable = new Table({
      columnWidths: [3500, 3500, 3500],
      rows: [
         new TableRow({
            children: [
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Зображення 1")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Зображення 2")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Зображення 3")],
               })
            ],
         }),
      ],
   });

   const DetailsTableOne = new Table({
      columnWidths: [500, 2000, 2000, 1000, 1500, 1500, 1500],
      rows: [
         new TableRow({
            children: [
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("#")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Найменування")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Виріб")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Кількість	")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Товщина")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Довжина")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Ширина")],
               }),
            ],
         }),
      ],
   });

   const DetailsTableTwo = new Table({
      columnWidths: [500, 1000, 1000, 1000, 1000],
      rows: [
         new TableRow({
            children: [
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("#")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Зверху (довжина)")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Знизу (довжина)")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Зправа (ширина)")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Зліва (ширина)")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Паз")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Сверління")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Фрезерування")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Матеріал")],
               }),
               new TableCell({
                  width: {
                     size: 1000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Опис")],
               }),
            ],
         }),
      ],
   });

   const FurnitureTable = new Table({
      columnWidths: [2000, 2000, 2000, 2000],
      rows: [
         new TableRow({
            children: [
               new TableCell({
                  width: {
                     size: 2000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Параметер 1")],
               }),
               new TableCell({
                  width: {
                     size: 2000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Параметер 2")],
               }),
               new TableCell({
                  width: {
                     size: 2000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Параметер 3")],
               }),
               new TableCell({
                  width: {
                     size: 2000,
                     type: WidthType.DXA,
                  },
                  children: [new Paragraph("Параметер 4")],
               }),
            ],
         }),
      ],
   });

   const ImageRow = new TableRow({
      children: [
         new TableCell({
            width: {
               size: 3000,
               type: WidthType.DXA,
            },
            children: [Images[0]],
         }),
         new TableCell({
            width: {
               size: 3000,
               type: WidthType.DXA,
            },
            children: [Images[1]],
         }),
         new TableCell({
            width: {
               size: 3000,
               type: WidthType.DXA,
            },
            children: [Images[2]],
         })
      ],
   });

   ImagesTable.addChildElement(ImageRow);

   detailsTableData.forEach((complectation, index) => {
      const newRow = new TableRow({
         children: [
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(String(index + 1))],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.name)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.product)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(String(complectation.amount))],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(String(complectation.thickness))],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(String(complectation.length))],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(String(complectation.width))],
            }),
         ],
      });

      DetailsTableOne.addChildElement(newRow);
   });

   detailsTableData.forEach((complectation, index) => {
      const newRow = new TableRow({
         children: [
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(String(index + 1))],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.topLength)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.bottomLength)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.rightWidth)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.leftWidth)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.path)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.drilling)],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(String(complectation.milling))],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(String(complectation.material))],
            }),
            new TableCell({
               width: {
                  size: 1000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(String(complectation.desc))],
            })
         ],
      });

      DetailsTableTwo.addChildElement(newRow);
   });

   furnitureTableData.forEach((complectation) => {
      const newRow = new TableRow({
         children: [
            new TableCell({
               width: {
                  size: 2000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param2)],
            }),
            new TableCell({
               width: {
                  size: 2000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param2)],
            }),
            new TableCell({
               width: {
                  size: 2000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param3)],
            }),
            new TableCell({
               width: {
                  size: 2000,
                  type: WidthType.DXA,
               },
               children: [new Paragraph(complectation.param4)],
            }),
         ],
      });

      FurnitureTable.addChildElement(newRow);
   });

   const doc = new Document({
      compatibility: {
      },
      sections: [
         {
            properties: {
               type: SectionType.CONTINUOUS,
               page: {
                  size: {
                     orientation: PageOrientation.LANDSCAPE,
                  },
               },
            },
            children: [
               ImagesTable,
               new Paragraph({
                  children: [
                     new TextRun(""),
                  ],
               }),
               new Paragraph({
                  children: [
                     new TextRun("Деталі"),
                  ],
               }),
               DetailsTableOne,
               new Paragraph({
                  children: [
                     new TextRun(""),
                  ],
               }),
               DetailsTableTwo,
               new Paragraph({
                  children: [
                     new TextRun(""),
                  ],
               }),
               new Paragraph({
                  children: [
                     new TextRun("Фурнітура"),
                  ],
               }),
               FurnitureTable,
            ],
         }
      ],
   });

   Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "example.docx");
   });
};