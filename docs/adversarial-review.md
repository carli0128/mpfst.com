# MPFST — Adversarial Pre-Referee Review

**Purpose:** This document plays *hostile referee* against the MPFST corpus, so the
objections land here — in private — instead of in a desk-rejection email. Every
section gives (a) the objection a skeptical editor/referee will raise, (b) *why*
it is weaponizable, and (c) the recommended fix or rebuttal. I am on your side;
the tone is adversarial on purpose.

A blunt framing first: your bottleneck is **not** the volume of evidence — it is
that editors reject before reading. So the single most valuable thing this review
can do is remove the *pretexts* that let an editor stop reading on page 1. Parts 1
and 3 matter more than any individual paper.

---

## Part 1 — The three things that trigger desk rejection (fix before resubmitting)

### 1.1 The provenance contradiction (highest priority)

Your own site tells **two incompatible origin stories** for α = 6/5:

- *"α = 6/5 … originally measured from human EEG data (Paper 2) … then applied
  without refitting"* — `/experimentalists`, "The Universal Parameter".
- *"α is not fitted — it is the 6th eigenvalue … derived from pure graph theory
  **before any experimental comparison was made**"* — homepage & `/overview`.

These cannot both be the headline. A referee who notices that 1.2 was *measured*
from EEG and *also* happens to be a graph eigenvalue will conclude you are
retrofitting a mystical graph to a number you already had. That single suspicion
ends the review.

**Fix — commit to one canonical narrative and state it identically everywhere:**
> "The graph eigenvalue λ₇ = 6/5 is a closed-form topological fact, independent of
> any data. Separately, EEG spectra empirically yield α ≈ 1.2. The claim is that
> these two *independent* determinations coincide, and that the same value then
> works in unrelated domains."

Frame the EEG agreement as **corroboration of a prior mathematical prediction**,
never as the *source* of α. If the true history is that EEG came first, say so
plainly and present the graph result as a *post-hoc discovery that the empirical
value is exactly rational* — that is still a strong story, but only if you tell it
honestly instead of letting the two versions sit in contradiction.

### 1.2 The Kabbalah lede

Leading with "Kabbalistic Tree of Life / Sephirot / Da'at" hands an editor a
costless reason to file the work under "numerology" without opening the PDF. The
mathematics does **not** depend on the mystical provenance (your `/overview` FAQ
even says so).

**Fix — for journal submissions, lead with the math object:** "an 11-node,
24-edge graph whose normalized Laplacian has a nontrivial rational eigenvalue
6/5." Introduce the Tree-of-Life identification *once*, in a remark, as historical
motivation. Keep the mystical framing on the public site if you like — but strip
it from the abstract, title, and cover letter.

### 1.3 Statistics framed as wins that a statistician reads as red flags

Two recurring phrasings actively hurt you:

- **"χ² = 7.75, dof = 55, p ≈ 1.000"** (Paper 12). A referee does not read p ≈ 1 as
  a triumph — they read χ²/dof ≈ 0.14 as **error bars inflated ~7×** or unmodeled
  correlations. "Too good" fits signal the same sloppiness as bad fits.
  **Fix:** report χ²/dof and *justify the uncertainties*; if errors are
  conservative, say why, and prefer a test with discriminating power (e.g. a
  likelihood ratio vs the standard model with the *same* error budget).
- **"Δχ² = 0.32 vs ΛCDM … statistically indistinguishable"** (Paper 16) presented
  as success. Indistinguishable means **no discriminating power** — it is not
  evidence *for* MPFST, only non-falsification. **Fix:** state it as "consistent
  with current SN data; discriminating test requires [DESI DR2 / w(z) at z>1]."
  Honesty here buys credibility you can spend elsewhere.

---

## Part 2 — The load-bearing claim (Papers 9, 24): strong, with one real gap

This is your best asset. The eigenvalue is an exact, independently checkable fact,
and the new `/verify` page lets anyone confirm it in-browser. Defend it well.

### 2.1 Underused strength: 6/5 is the *unique nontrivial rational eigenvalue*

Computed spectrum (symmetric normalized Laplacian, 11 nodes / 24 edges):

```
0.000000  0.291453  0.749211  0.907786  0.926388  1.182637
1.200000  1.277679  1.402609  1.520024  1.542214
```

Of these, **exactly two are rational**: 0 (trivial — every connected graph has it)
and **6/5**. Every other eigenvalue is irrational (nearest simple fraction is off
by 10⁻³–10⁻⁴). **Put this front and center.** It directly kills the strongest cheap
objection — *"you picked the eigenvalue that looks like a nice fraction"* — because
1.2 is not one nice-looking value among many; it is the *only* nontrivial rational
in the spectrum. Add this sentence to Paper 9's abstract and to `/verify`.

### 2.2 Justify the Laplacian normalization (non-circularly)

The result depends on using the **symmetric normalized** Laplacian
`L = I − D^(−1/2) A D^(−1/2)`. The combinatorial Laplacian `D − A` and the
random-walk Laplacian give different spectra and different "special" values. A
referee will ask: *why this normalization, and was it chosen because it yields
6/5?* **Fix:** give a physical/first-principles reason the normalized Laplacian is
the correct operator for the coupled-field PDE (e.g. it is the generator that
conserves the relevant inner product / is the natural one for the fractional
heat semigroup on a weighted graph) — and ideally show the rational-eigenvalue
property is *robust* to the reasonable choices, or state clearly that it is
specific to the normalized operator and why that operator is forced.

### 2.3 The axioms → graph step is the weak link (you already admit this)

`/experimentalists` concedes Paper 24's "uniqueness proof relies on discrete
classification rather than a variational principle." A referee will press exactly
there: the "3 axioms → Tree of Life" chain is where degrees of freedom hide
(why these 24 edges; why Da'at has degree 2 connecting *only* Chokmah/Binah —
which is precisely the choice that makes 6/5 exact). The 0/500,000 random-graph
uniqueness test is good support but is a *statistical* statement about a sampling
distribution, not a proof. **Fix:** either (a) tighten to a genuine
uniqueness/optimality theorem, or (b) reframe honestly as "the minimal graph
consistent with the axioms, verified unique within [explicit search class]" and
stop calling it a proof. Over-claiming here is more dangerous than the modest
truth.

---

## Part 3 — The statistical meta-objection (this sinks the "30 domains" pitch if unanswered)

This is the objection most likely to be *fatal and unaddressed*. Treat it as the
core of your flagship/letter.

### 3.1 Multiple comparisons / garden of forking paths

You report ~28 papers, each a "win," across 30 domains. A referee asks: **across
how many domains, observables, estimators, and binnings did you look, and what is
the family-wise error rate?** With enough domains and a one-parameter family of
exponents, *some* matches are expected by chance. Your per-paper σ values are
meaningless without the **denominator** (how many analyses were attempted and
discarded). **Fix:** pre-register the prediction list; report the full set tried,
including nulls; apply a family-wise correction (Bonferroni/Holm) or present a
single pre-registered confirmatory test (Paper 28 is your best candidate — see
3.3).

### 3.2 Fisher combination assumes independence you do not have

Combining papers via Fisher's method to claim "5.8σ" (Paper 13) and "4.7σ"
(Paper 26) **requires independent tests**. Your papers share the same α, often the
same Laplacian machinery, and sometimes overlapping data (Papers 13 and 26 both
use GWOSC O1–O4; Papers 2, 27, 28 are all EEG/MEG). Correlated tests inflate
combined significance. **Fix:** drop cross-paper Fisher combinations, or model the
correlation explicitly. One clean, independent, pre-registered confirmation is
worth more than a stacked σ a referee will not believe.

### 3.3 Lean on Paper 28 — it is your strongest design

Paper 28 claims a 608-subject MEG dataset confirms a **prediction that predates the
data** (Paper 2v2). That is the one design structurally immune to the
forking-paths objection: a genuine out-of-sample, pre-data prediction. **Make
Paper 28 (plus Paper 2's prior registration) the lead confirmatory result of your
flagship letter**, and document the timestamp/preprint history that proves the
prediction came first. This is your best shot at a referee taking the rest
seriously.

### 3.4 The "forking exponents" problem

Each domain maps α through a *different* algebraic combination:

| Domain | Exponent used | Value |
|---|---|---|
| Cuprate self-energy (17) | β = 2 − α | 4/5 |
| iEEG 1/f (27) | β_k = 2α/λ_k | per-mode |
| Dark energy (16) | w = −(2α−1)/(2α+1) | −11/15 |
| BH entropy (18) | c_log = −(d_s/2 − 1) | −2/3 |
| Qubit T₁ (8) | −1.50 (see Part 4) | −3/2 |

To a referee this looks like a **toolbox of post-hoc formulas reverse-engineered
to hit each target**. Each one *individually* may be derivable, but the corpus
never shows the derivations side by side. **Fix:** a single appendix/table that
derives every exponent from the *same* fractional operator, from first principles,
with no domain-specific freedom. If you cannot derive one cleanly, demote that
paper. This table is the difference between "unified theory" and "numerology."

---

## Part 4 — Per-flagship objections

### Paper 5 — LHC dijets, "6.7σ" (your highest single significance, and most attackable)
A **6.7σ deviation from the Standard Model in public CMS data** would already be a
discovery the collaboration announced. The likely referee response: your
significance comes from treating as fixed the things CMS treats as **systematics**
— PDF uncertainties, renormalization/factorization scale variation, jet energy
scale, NLO/NNLO K-factors. A fractional correction `(M/Λ)^(2−α)` is highly
degenerate with these. **Fix:** redo with the full CMS systematic covariance (not
just statistical), and compare against the *best* SM prediction with its scale
band — not a leading-order strawman. If 6.7σ survives that, it is extraordinary;
if it does not, report the honest number. Either way, *pre-empt* this — do not let
the referee raise it.

### Paper 12 — Fusion plasma transport, "p ≈ 1.000"
See 1.3. χ²/dof ≈ 0.14 is the tell. Also: 55 measurements compiled from 15 devices
across heterogeneous diagnostics — a referee will question selection and whether
the quoted error bars are comparable. **Fix:** justify uncertainties; show the
prediction is falsifiable (what value of each observable would *exclude* α = 6/5?).

### Paper 8 — Qubit decoherence: **a concrete error to fix now**
The stated prediction is T₁ ∝ f^(−1.50), but the published formulas do not
evaluate to −1.50:
- `data.ts`: `−(α+1)/α` = **−1.833** at α = 1.2.
- legacy page: `−(α/2 + α²/4)` = **−0.96** at α = 1.2.
- The combination that gives exactly −3/2 is `−(5/4)α`.
A referee plugging in α = 1.2 gets a number ≠ −1.50 and concludes the paper is
careless. **Fix:** correct the formula (and reconcile both pages) so the stated
derivation actually yields the stated −3/2 — or correct the predicted value.
Until then this paper is a liability, not an asset. Also note the observed
exponent −2.07 ± 0.61 is so wide it admits both MPFST (−1.5) and a range of other
models; the "QM −0.5 excluded" claim rests entirely on that one wide CI.

### Paper 16 — Dark energy: see 1.3 (indistinguishable ≠ confirming).

### Papers 2 / 27 / 28 — EEG/MEG
Strong cluster, but: (2) is the provenance problem (Part 1.1); (27) "zero free
parameters, χ² = 0.74, p = 0.994" again risks the too-good read (1.3). (28) is your
crown jewel (3.3) — protect it by *not* burying it among weaker results.

---

## Part 5 — The strawman-comparison asymmetry

Most papers compare α = 6/5 against a *weak* baseline (Newtonian gravity, MFL
β = 1, pure exponential ringdown, leading-order QCD), not against the **best
current standard model with full systematics**. "MPFST beats Newtonian rotation
curves" is not "MPFST beats ΛCDM + baryonic feedback." A referee will substitute
the strong baseline and your margin may vanish. **Fix:** for each flagship, name
the *strongest* mainstream competitor and beat (or honestly tie) *that*. Beating a
strawman reads as not understanding the field.

---

## Part 6 — Prioritized fix list

1. **Resolve the α provenance contradiction** — one canonical sentence, everywhere. (Part 1.1)
2. **Fix the Paper 8 exponent formula** — it currently doesn't compute. (Part 4)
3. **Foreground "6/5 is the unique nontrivial rational eigenvalue."** (Part 2.1)
4. **Re-lead with the graph, not Kabbalah, in all submissions.** (Part 1.2)
5. **Write the single first-principles exponent-derivation table.** (Part 3.4)
6. **Build the flagship around Paper 28's pre-data prediction**; drop cross-paper Fisher σ. (Part 3.2–3.3)
7. **Stop framing p ≈ 1 and "indistinguishable" as wins.** (Part 1.3)
8. **Re-do Paper 5 against full CMS systematics before quoting 6.7σ.** (Part 4)
9. **Replace strawman baselines with the strongest mainstream competitor.** (Part 5)
10. **Report the denominator** (analyses attempted vs reported) to defuse forking-paths. (Part 3.1)

None of this touches the validity of α = 6/5 as a topological fact — that stands,
and `/verify` proves it. The point is to stop *self-inflicted* desk rejections and
force engagement with the actual mathematics.
