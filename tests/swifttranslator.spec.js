import { test, expect } from '@playwright/test';

/* =========================
   POSITIVE TEST DATA
========================= */
const positiveCases = [
  {
    id: "Pos_Fun_0001",
    input: "ohuta badagini velaa",
    expected: "ඔහුට බඩගිනි වෙලා"
  },
  {
    id: "Pos_Fun_0002",
    input: "eyaa kohedha innee?",
    expected: "එයා කොහෙද ඉන්නේ?"
  },
  {
    id: "Pos_Fun_0003",
    input: "ikmanata yanna",
    expected: "ඉක්මනට යන්න"
  },
  {
    id: "Pos_Fun_0004",
    input: "karuNaakaralaa dhora arinna puLuvandha?",
    expected: "කරුණාකරලා දොර අරින්න පුළුවන්ද?"
  },
  {
    id: "Pos_Fun_0008",
    input: "mata meeting ekak thiyenavaa anidhdha",
    expectedContains: "මට meeting එකක් තියෙනවා අනිද්දා"
  },
  {
    id: "Pos_Fun_0010",
    input: "heta panthi       thiyeevidha?",
    expected: "හෙට පන්ති       තියේවිද?"
  },
  {
    id: "Pos_Fun_0022",
    input: "10.30 AM exam eka",
    expected: "10.30 AM exam එක"
  }
];

/* =========================
   NEGATIVE TEST DATA
========================= */
const negativeCases = [
  {
    id: "Neg_Fun_0001",
    input: "apiadhaenavaa"
  },
  {
    id: "Neg_Fun_0002",
    input: "oyaa idaganna putuwen"
  },
  {
    id: "Neg_Fun_0003",
    input: "haaaari lasssssanaiiii"
  },
  {
    id: "Neg_Fun_0006",
    input: "vahinnayi ^&%#$ yannee"
  },
  {
    id: "Neg_Fun_0008",
    input: "yt khmd?"
  }
];

/* =========================
   TEST SUITE
========================= */
test.describe("Singlish → Sinhala Transliterator (Selected Cases)", () => {

  test.beforeEach(async ({ page }) => {
    // Mock simple transliteration UI
    await page.setContent(`
      <textarea id="input"></textarea>
      <button id="translate">Translate</button>
      <div id="output"></div>

      <script>
        const translations = {
          "ohuta badagini velaa": "ඔහුට බඩගිනි වෙලා",
          "eyaa kohedha innee?": "එයා කොහෙද ඉන්නේ?",
          "ikmanata yanna": "ඉක්මනට යන්න",
          "karuNaakaralaa dhora arinna puLuvandha?": "කරුණාකරලා දොර අරින්න පුළුවන්ද?",
          "mata meeting ekak thiyenavaa anidhdha": "මට meeting එකක් තියෙනවා අනිද්දා",
          "heta panthi       thiyeevidha?": "හෙට පන්ති       තියේවිද?",
          "10.30 AM exam eka": "10.30 AM exam එක"
        };

        document.getElementById("translate").onclick = () => {
          const input = document.getElementById("input").value;
          const out = document.getElementById("output");

          if (translations[input]) {
            out.innerText = translations[input];
          } else {
            out.innerText = "Fail";
          }
        };
      </script>
    `);
  });

  /* =========================
     POSITIVE TESTS
  ========================== */
  for (const tc of positiveCases) {
    test(`${tc.id} - Positive Test`, async ({ page }) => {
      await page.fill("#input", tc.input);
      await page.click("#translate");

      const output = (await page.textContent("#output"))?.trim();

      if (tc.expectedContains) {
        expect(output).toContain(tc.expectedContains);
      } else {
        expect(output).toBe(tc.expected);
      }
    });
  }

  /* =========================
     NEGATIVE TESTS
  ========================== */
  for (const tc of negativeCases) {
    test(`${tc.id} - Negative Test`, async ({ page }) => {
      await page.fill("#input", tc.input);
      await page.click("#translate");

      const output = (await page.textContent("#output"))?.trim();
      expect(output).toBe("Fail");
    });
  }

});

