import {
  schemes,
  type AgeKey,
  type DisabilityKey,
  type DocKey,
  type GenderKey,
  type IncomeKey,
  type OccupationKey,
  type Scheme,
} from "@/data/schemes";
import type { Loc } from "@/lib/i18n";

export type EligibilityAnswers = {
  ageGroup: AgeKey | "";
  gender: GenderKey | "";
  occupation: OccupationKey | "";
  income: IncomeKey | "";
  disability: DisabilityKey | "";
  documents: DocKey[];
  interests: string[];
};

export type SchemeMatch = {
  slug: string;
  reasons: Loc[];
  missingDocs: DocKey[];
  strength: number;
};

/**
 * Rule matcher: a scheme appears when at least one of its rule sets matches.
 * Every condition inside a rule set has to hold (ages AND occupations AND docs…).
 */
function matchesCriterion(criteria: Scheme["ruleSets"][number]["criteria"], answers: EligibilityAnswers) {
  const docs = new Set(answers.documents);
  if (criteria.ages && (!answers.ageGroup || !criteria.ages.includes(answers.ageGroup))) return false;
  if (criteria.genders && answers.gender && !criteria.genders.includes(answers.gender)) return false;
  if (criteria.occupations && (!answers.occupation || !criteria.occupations.includes(answers.occupation))) return false;
  if (criteria.incomes && answers.income && !criteria.incomes.includes(answers.income)) return false;
  if (criteria.anyDocs && !criteria.anyDocs.some((d) => docs.has(d))) return false;
  if (criteria.allDocs && !criteria.allDocs.every((d) => docs.has(d))) return false;
  if (criteria.noDocs && criteria.noDocs.some((d) => docs.has(d))) return false;
  if (criteria.disability === "yes" && answers.disability !== "yes") return false;
  if (criteria.disability === "no" && answers.disability === "yes") return false;
  const hasAnyCondition = Boolean(
    criteria.ages || criteria.genders || criteria.occupations || criteria.incomes || criteria.anyDocs || criteria.allDocs || criteria.noDocs || criteria.disability,
  );
  return hasAnyCondition;
}

export function evaluateEligibility(answers: EligibilityAnswers) {
  const matches: SchemeMatch[] = [];
  const notMatched: Scheme[] = [];
  const pool = answers.interests.length
    ? schemes.filter((s) => answers.interests.includes(s.slug))
    : schemes;

  for (const scheme of pool) {
    const hitReasons = scheme.ruleSets
      .filter((set) => matchesCriterion(set.criteria, answers))
      .map((set) => set.reason);
    if (hitReasons.length > 0) {
      matches.push({
        slug: scheme.slug,
        reasons: hitReasons,
        missingDocs: scheme.requiredDocs.filter((d) => !answers.documents.includes(d)),
        strength: hitReasons.length * 10 + (4 - Math.min(4, scheme.requiredDocs.filter((d) => !answers.documents.includes(d)).length)),
      });
    } else {
      notMatched.push(scheme);
    }
  }

  matches.sort((a, b) => b.strength - a.strength);
  return { matches, notMatched };
}
