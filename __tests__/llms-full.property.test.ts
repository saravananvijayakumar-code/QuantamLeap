import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

/**
 * **Validates: Requirements 8.2**
 * Property 8: LLMs-full.txt Heading Hierarchy Is Valid
 *
 * For any heading in the llms-full.txt content, the heading level SHALL not skip levels
 * (no H3 without a preceding H2, no H2 without a preceding H1), ensuring valid Markdown
 * heading hierarchy.
 */
describe("Property 8: LLMs-full.txt Heading Hierarchy Is Valid", () => {
  const filePath = path.resolve(process.cwd(), "public/llms-full.txt");
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  // Parse all headings: lines starting with one or more # followed by a space
  const headings = lines
    .filter((line) => /^#{1,6}\s/.test(line))
    .map((line) => {
      const match = line.match(/^(#{1,6})\s/);
      const level = match![1].length;
      return { level, text: line.trim() };
    });

  it("the file exists and is readable", () => {
    expect(content.length).toBeGreaterThan(0);
  });

  it("the file size is under 100KB", () => {
    const stats = fs.statSync(filePath);
    expect(stats.size).toBeLessThan(100 * 1024);
  });

  it("there is at least one H1 heading", () => {
    const h1Headings = headings.filter((h) => h.level === 1);
    expect(h1Headings.length).toBeGreaterThanOrEqual(1);
  });

  it("the first heading is H1 (single #)", () => {
    expect(headings.length).toBeGreaterThan(0);
    expect(headings[0].level).toBe(1);
  });

  it("there are multiple H2 headings (sections)", () => {
    const h2Headings = headings.filter((h) => h.level === 2);
    expect(h2Headings.length).toBeGreaterThan(1);
  });

  it("no heading level is skipped (hierarchy is valid)", () => {
    // Track the maximum heading level seen so far at each depth.
    // A heading at level N is only valid if all levels 1..N-1 have appeared before it.
    const seenLevels = new Set<number>();

    for (const heading of headings) {
      // For the current heading level, all parent levels must have been seen
      for (let level = 1; level < heading.level; level++) {
        expect(
          seenLevels.has(level),
          `Heading "${heading.text}" is level ${heading.level} but level ${level} has not appeared before it`
        ).toBe(true);
      }
      seenLevels.add(heading.level);
    }
  });
});
