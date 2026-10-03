import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  // Standard Letter page: 612 x 792 pt
  const page = pdfDoc.addPage([612, 792]);
  const { width, height } = page.getSize();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  const primaryColor = rgb(0.1, 0.1, 0.1);
  const lineColor = rgb(0.2, 0.2, 0.2);
  const margin = 54; // 0.75 in
  let y = height - 50;

  // Helper function to draw section header with horizontal line
  function drawSectionHeader(title) {
    y -= 14;
    page.drawText(title, {
      x: margin,
      y,
      size: 11.5,
      font: fontItalic,
      color: primaryColor,
    });
    y -= 4;
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 0.75,
      color: lineColor,
    });
    y -= 12;
  }

  // Header - Name
  const name = "Pawan Negi";
  const nameWidth = fontRegular.widthOfTextAtSize(name, 20);
  page.drawText(name, {
    x: (width - nameWidth) / 2,
    y,
    size: 20,
    font: fontRegular,
    color: primaryColor,
  });
  y -= 18;

  // Title
  const subtitle = "Aspiring Machine Learning Engineer | Competitive Programmer";
  const subWidth = fontRegular.widthOfTextAtSize(subtitle, 11);
  page.drawText(subtitle, {
    x: (width - subWidth) / 2,
    y,
    size: 11,
    font: fontRegular,
    color: primaryColor,
  });
  y -= 16;

  // Contact line 1
  page.drawText("pawannegi2243@gmail.com", {
    x: margin,
    y,
    size: 10,
    font: fontRegular,
    color: primaryColor,
  });

  const linksRight1 = "LinkedIn | GitHub";
  const linksWidth1 = fontRegular.widthOfTextAtSize(linksRight1, 10);
  page.drawText(linksRight1, {
    x: width - margin - linksWidth1,
    y,
    size: 10,
    font: fontRegular,
    color: primaryColor,
  });
  y -= 14;

  const linksRight2 = "Portfolio | Codeforces";
  const linksWidth2 = fontRegular.widthOfTextAtSize(linksRight2, 10);
  page.drawText(linksRight2, {
    x: width - margin - linksWidth2,
    y,
    size: 10,
    font: fontRegular,
    color: primaryColor,
  });
  y -= 8;

  // Summary
  drawSectionHeader("Summary");
  const summaryText = "BCA student pursuing a career in Data Science and Machine Learning, with a growing foundation in Python, NumPy, Pandas, Matplotlib, SQL, and data analysis. Currently developing practical skills through machine learning and data-driven projects, while exploring web development with React, JavaScript, HTML, and CSS. Familiar with C, C++, Java, Git, and modern development tools, with an interest in building practical solutions using data and software.";
  
  // Word wrap summary
  const maxWidth = width - margin * 2;
  const words = summaryText.split(" ");
  let currentLine = "";
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = fontRegular.widthOfTextAtSize(testLine, 9.5);
    if (testWidth > maxWidth) {
      page.drawText(currentLine, { x: margin, y, size: 9.5, font: fontRegular, color: primaryColor });
      y -= 13;
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    page.drawText(currentLine, { x: margin, y, size: 9.5, font: fontRegular, color: primaryColor });
    y -= 10;
  }

  // Education
  drawSectionHeader("Education");
  
  // University
  page.drawText("Maharishi University of Information Technology", { x: margin, y, size: 10, font: fontBold, color: primaryColor });
  const ed1Date = "Expected 2028";
  page.drawText(ed1Date, { x: width - margin - fontRegular.widthOfTextAtSize(ed1Date, 10), y, size: 10, font: fontRegular, color: primaryColor });
  y -= 12;

  page.drawText("Bachelor of Computer Applications (BCA) - CGPA: 8.6 (1st Year)", { x: margin, y, size: 9.5, font: fontItalic, color: primaryColor });
  const ed1Loc = "Noida";
  page.drawText(ed1Loc, { x: width - margin - fontItalic.widthOfTextAtSize(ed1Loc, 9.5), y, size: 9.5, font: fontItalic, color: primaryColor });
  y -= 14;

  // School 12th
  page.drawText("Government Boys Senior Secondary School", { x: margin, y, size: 10, font: fontBold, color: primaryColor });
  const ed2Date = "2025";
  page.drawText(ed2Date, { x: width - margin - fontRegular.widthOfTextAtSize(ed2Date, 10), y, size: 10, font: fontRegular, color: primaryColor });
  y -= 12;

  page.drawText("CBSE Class XII - 77.4%", { x: margin, y, size: 9.5, font: fontItalic, color: primaryColor });
  const ed2Loc = "New Kondli, Delhi";
  page.drawText(ed2Loc, { x: width - margin - fontItalic.widthOfTextAtSize(ed2Loc, 9.5), y, size: 9.5, font: fontItalic, color: primaryColor });
  y -= 14;

  // School 10th
  page.drawText("Government Boys Senior Secondary School", { x: margin, y, size: 10, font: fontBold, color: primaryColor });
  const ed3Date = "2023";
  page.drawText(ed3Date, { x: width - margin - fontRegular.widthOfTextAtSize(ed3Date, 10), y, size: 10, font: fontRegular, color: primaryColor });
  y -= 12;

  page.drawText("CBSE Class X - 70%", { x: margin, y, size: 9.5, font: fontItalic, color: primaryColor });
  const ed3Loc = "New Kondli, Delhi";
  page.drawText(ed3Loc, { x: width - margin - fontItalic.widthOfTextAtSize(ed3Loc, 9.5), y, size: 9.5, font: fontItalic, color: primaryColor });
  y -= 10;

  // Specialized Skills
  drawSectionHeader("Specialized Skills");
  const skills = [
    { label: "Programming: ", text: "Java, C, C++, Python, SQL" },
    { label: "Data Analysis: ", text: "NumPy, Pandas, Matplotlib, Microsoft Excel" },
    { label: "Web Development: ", text: "HTML5, CSS3, React.js" },
    { label: "Database: ", text: "MySQL, DBMS" },
    { label: "Tools: ", text: "Git, GitHub, VS Code, Vercel, Canva" },
    { label: "Creative: ", text: "Video Editing, UI Design, Content Creation" },
  ];

  for (const skill of skills) {
    page.drawText(skill.label, { x: margin, y, size: 9.5, font: fontBold, color: primaryColor });
    const labelW = fontBold.widthOfTextAtSize(skill.label, 9.5);
    page.drawText(skill.text, { x: margin + labelW, y, size: 9.5, font: fontRegular, color: primaryColor });
    y -= 13;
  }
  y -= 2;

  // Projects
  drawSectionHeader("Projects");
  page.drawText("Personal Portfolio Website", { x: margin, y, size: 10, font: fontBold, color: primaryColor });
  const prjDate = "2025";
  page.drawText(prjDate, { x: width - margin - fontRegular.widthOfTextAtSize(prjDate, 10), y, size: 10, font: fontRegular, color: primaryColor });
  y -= 12;

  page.drawText("React.js, HTML, CSS, Git, Vercel", { x: margin, y, size: 9.5, font: fontItalic, color: primaryColor });
  y -= 13;

  const prjBullets = [
    "Designed and developed a responsive personal portfolio showcasing projects, skills and certifications.",
    "Built reusable React components and responsive layouts with modern UI practices.",
    "Managed version control using Git/GitHub and deployed the project on Vercel."
  ];

  for (const bullet of prjBullets) {
    page.drawText("•", { x: margin + 8, y, size: 9.5, font: fontRegular, color: primaryColor });
    page.drawText(bullet, { x: margin + 20, y, size: 9.5, font: fontRegular, color: primaryColor });
    y -= 13;
  }
  y -= 2;

  // Hackathons
  drawSectionHeader("Hackathons");
  const hackBullets = [
    "Participated in 3 hackathons (1 inter-college and 2 intra-college).",
    "Built and presented innovative web application solutions under strict deadlines."
  ];
  for (const bullet of hackBullets) {
    page.drawText("•", { x: margin + 8, y, size: 9.5, font: fontRegular, color: primaryColor });
    page.drawText(bullet, { x: margin + 20, y, size: 9.5, font: fontRegular, color: primaryColor });
    y -= 13;
  }
  y -= 2;

  // Certifications
  drawSectionHeader("Certifications");
  const certBullets = [
    "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate – Oracle University",
    "Certificate for the Completion of Java Training – EduPyramids & Spoken Tutorial, IIT Bombay",
    "Certificate for the Completion of C Training – EduPyramids & Spoken Tutorial, IIT Bombay"
  ];
  for (const bullet of certBullets) {
    page.drawText("•", { x: margin + 8, y, size: 9.5, font: fontRegular, color: primaryColor });
    page.drawText(bullet, { x: margin + 20, y, size: 9.5, font: fontRegular, color: primaryColor });
    y -= 13;
  }

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve('public/resume.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Resume generated successfully at: ${outputPath}`);
}

generateResume().catch(console.error);
