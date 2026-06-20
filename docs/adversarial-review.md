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

---

# Part 7 — Primary-source paper-by-paper audit (verified June 2026)

Every Zenodo record (28 papers + the PRL letter) was pulled from
`zenodo.org/api/records/<id>`, the manuscript PDF/TeX downloaded and read, and each
number cross-checked against `components/data.ts`. The eigenvalue and the Paper-8 /
dark-energy / black-hole exponent algebra were re-derived independently. **All numbers
below are verbatim from the papers unless marked "site".**

Three findings here **overturn recommendations in Parts 1–6** — flagged as C1–C3.

## 7.0 Corrections to the earlier review

- **C1 — The Paper 8 "formula bug" is not in the paper; it is in `data.ts`.** (Revises
  Part 4 / Part 6 #2.) Paper 8 derives the qubit exponent as
  **γ = −(d/α − 1) = −(3 − α)/α = −1.50** at α = 6/5, d = 3 — internally consistent and
  correct. The wrong formula `−(α+1)/α` (= −1.833) lives **only** in `data.ts`
  (`howToReproduce`). The `−(5/4)α` that Part 4 proposed *also* gives −1.50, but only
  by coincidence at α = 6/5 (it diverges from the real form −(3−α)/α everywhere else,
  e.g. −1.25 vs −2.0 at α = 1). **Fix the site, not the paper, and use −(3−α)/α.**

- **C2 — Do NOT build the flagship on Paper 28.** (Reverses Part 3.3.) Paper 28's
  "prediction that predates the data" is **unsubstantiated**. The manuscript is dated
  **2026-03-30**; the Liu/Wiesman/Baillet MEG dataset it claims to have predicted was
  posted **2026-03-19** (its DOI literally encodes the date: `…2026.03.19…`) — i.e. the
  "prediction" paper appeared **11 days after** the data. Paper 28 provides **no dated
  artifact** (no version history, no timestamped preprint of the *directional* claim)
  proving priority, performs **no analysis on the MEG data** (it is a narrative mapping
  of Liu et al.'s already-published summary statistics onto graph nodes), and defers all
  three of its own concrete predictions to "future work." A referee who checks the dates
  will read this as the single most damaging item in the corpus. Treat it as a liability,
  not the crown jewel.

- **C3 — The uniqueness denominator is wrong on the site.** (Revises Parts 2.3, 3.3.)
  `data.ts` says "0/500,000 random graphs match." Paper 24 actually tested **100,000**
  random graphs and reports **3.0%** have *any* eigenvalue within 0.001 of 6/5 and
  **0.004% match the full spectrum** (≈ 4 graphs), not zero. "0/500,000" is unsupported
  by any paper. (Papers 19, 20, 25 run their own null tests at N = 10⁴–10⁵ with *different*
  numbers again — see 7.3.)

## 7.1 Master verdict table

`Repro` = does the paper's own headline reproduce as stated? `Site=Paper` = does
`data.ts` match the paper? Severity ranks the *site* mismatch / referee exposure.

| # | Short | Repro | Site=Paper | Severity | One-line |
|---|---|---|---|---|---|
| 1 | Transferred potential | partial | ✗ | **High** | Prints a **different ORCID** (0000-0001-5680-3804); site's "CFC" prediction & "Grinberg dataset" are both wrong (paper: δ/γ transfer ratio, calibrated on one Radin 2004 point). |
| 2 | EEG CFC | ✓ | ✓ | Low | r=0.767, p=0.0097 verbatim. But rests on **10 off-diagonal points** and barely beats nearest-neighbour (r=0.743). |
| 3 | MiniBooNE | overstated | ✗ | Med | Real result Δχ²=4.20 (**2.0σ**), 1 free param η — not "excess reproduced." Metadata title carries a "(v2…)" suffix. |
| 4 | SPARC rotation | ✓ | ✗ | **High** | Beats **NFW dark-matter halo**, *not* "Newtonian"; p=1.70×10⁻⁶ is **not** <10⁻⁶; **MOND never fitted**. |
| 5 | LHC dijets | ✓ | ✗ | **High** | **CMS only** (not "ATLAS/CMS"); 6.7σ is vs an **LO/NLO strawman with no systematics** (author concedes §5.3); headline Δχ²=25.9 vs α-scan's 32.2 disagree. |
| 6 | GR recovery | ✓ | ✓ | Low | Upper-bound / consistency paper (ε<1.15×10⁻⁴) — **non-falsification, not positive evidence**. |
| 7 | Josephson | ✓ | ✓ | Low | Formula reproduces 0.008. Internal: text says ζ(1+α_d) but boxed eq uses ζ(α_d). Metadata title differs. |
| 8 | Qubit decoherence | ✓ | ✗ | **High** | Paper is **fine** (γ=−(d/α−1)=−1.50). Site is wrong on formula, **error bar (±0.31 not ±0.61)**, and **N=24/12 experiments not "15 IBM qubits."** Result fragile to one 72 GHz point (drops to −1.05). |
| 9 | Sephirotic eigenvalue | ✓✓ | ✓ | — (keystone) | Eigenvalue **and** eigenvector independently reproduced **exact** (‖Lv−1.2v‖=0). Author printed "Carlos **A.** Freeman"; provenance stated **EEG-first**. |
| 10 | PDE well-posedness | ✓ | ✓ | Med | 5 theorems present, but the energy-dissipation proof has **left-in "Wait—" sign-error episodes**; the governing PDE is silently re-signed mid-proof (Eq. 2 → Eq. 17). Author "A." |
| 11 | Quantization/gravity | ✓ | ~ | Low | G(r)~r⁻¹·⁸ ✓. "6 computational demonstrations" is not a real phrase (6 figures / 7 steps). Author "A." |
| 12 | Fusion plasma | ✓ | ✓ | Med | All 5 predictions verbatim. **χ²/dof = 0.14** is the "too-good" tell; paper concedes it used **published error bars with no reanalysis**. Author "A." |
| 13 | GW power-law | ✓ | ✗ | **High** | Site "**486 measurements, 243 events**" inverts reality (486 **events** → 109 measurements); **243 appears nowhere**. Fisher 5.8σ combines **2** p-values, not "three datasets." Main text vs supplement disagree (9.16×10⁻⁵ vs 2.53×10⁻⁴). |
| 14 | Dimensional reduction | ✓ | ✗ | Med | Δ=0.458 ✓ but "**40% stronger**" is not in the paper — it reports **129%** (vs the 10-node graph). v2 title. |
| 15 | Stochastic PDE | ✓ | ✗ | **High** | Site "**stochastic resonance at σ≈0.3**" **inverts the paper's explicit negative result** ("resonance … does not occur"). "R²=0.997" is mis-sourced (Kramers R²=0.996). v2 title. |
| 16 | Dark energy | ~ | ✗ | **High** | Only **−1+(2−α)/3 = −11/15** is correct; the paper's *own* headline formula −(3α−2)/(3α) = −0.444 is wrong; site's −(2α−1)/(2α+1) = −0.412 is wrong. "Δχ²=0.32" means **indistinguishable from ΛCDM** (paper says so); fit pulls Ω_m to 0.213. |
| 17 | Cuprate/graphene | ✓ | ✗ | **High** | Site "χ²=4.4 vs 33.5" are **reduced χ²/N mislabeled as totals** (real: 110.6 vs 838.4). Measured β≈0.70 ≠ predicted 0.80; MPFST χ²/N=4.43 (poor); free-fit beats it. |
| 18 | Black-hole entropy | ✓ | ✗ | Med-High | Paper's d_s=2d/α=10/3, c_log=−2/3 ✓. **Site formula "d_s=2α/2" is wrong** (gives +0.4). τ~M^(10/3)≈M³·³³ (site "M³·²"). "Matches AS exactly" cherry-picks (Falls–Raghuraman AS = −3/4). |
| 19 | Bioelectric morphogenesis | ✓ | ✓ | Low | 3.1:1, Fisher p=0.0014 verbatim. Ref slip (Morgan cited as the source of a Levin result); no printed ORCID. |
| 20 | Microtubule λ | ~ | ~ | **High** | **Own null test p = 0.058 — fails conventional significance.** "Converges to 1.2" is essentially expected for any large dense graph (densely-packed [0,2] spectrum); the paper concedes this. |
| 21 | LENR | claim | ~ | Med | "2,697 orders of magnitude" is a ratio of two absurd WKB probabilities; paper admits the absolute rate is **still 14 OoM below observation**. 23.7 MeV = textbook Q-value × a factor tuned to ≈1. No ORCID. |
| 22 | MT lumen pump | — | ✗ | **CRITICAL** | **This record is [RETRACTED] on Zenodo** yet is still presented as a live domain. Its own "Meyer-Overton r=0.995" (prose) is contradicted by its own Table II (r=0.942). |
| 23 | Atomic form factors | ✓ | ✓ | Low | β=1.411±0.144; "2.8× closer to 1.2 than 2.0" is arithmetically correct. **Cleanest empirical match** — but 1.411 ≠ 1.200 (a 17% miss the paper admits). |
| 24 | First-principles derivation | ✓ | ✗ | Med | λ₆=6/5 exact ✓. Uniqueness is **100k graphs, 0.004% match** (not "0/500,000"). Chain runs through sacred geometry (Flower of Life, Metatron's Cube, Melchizedek); Step 25 **admits it has no uniqueness proof**. |
| 25 | Bioelectric channels | ✓ | ✓ | Low-Med | 8 modes / 7-of-8 ✓. Pervasive **broken citation markers "(?)"**; one of the "8 internal modes" is the trivial λ₀=0 mode; channel-count test itself is p=0.19 (n.s.). |
| 26 | GW spatial modes | ~ | ✗ | **High** | Site "**4.7σ, p=3.2×10⁻⁶**" is **not in the paper** (paper says only ">5σ", qualitative). "8/8" is an **SNR≥8 sub-slice**; overall the 3-mode model ranks **last (15.6%)**. Shares GWOSC O1–O4 with #13 → not independent. |
| 27 | iEEG spectral | ~ | ✗ | **High** | Site "**χ²=0.74, p=0.994**" is **not in the paper** (no χ² test exists). Worse: the paper's **own pooled data excludes β=1.2 at p=2.57×10⁻²³**. Modes assigned by nearest-neighbour matching (fitting in disguise). |
| 28 | MEG directional | ✗ | ✗ | **CRITICAL** | See **C2** — dated 11 days *after* the data it "predicted"; no analysis; predictions deferred. The claimed "Paper 2v2" label does not appear in the paper. |
| PRL | 13-domain letter | ~ | ✗ | **High** | **Three contradictory global p-values** (10⁻¹⁵, 4.3×10⁻⁸ [the only one derived], 10⁻²⁴). Its printed graph **spectrum disagrees with the canonical graph** (only λ₆=1.2 shared) — a *different* Laplacian. Title says "**Thirteen** domains" (site says 30). Accession "LQ19911"/"Desk rejected" appear nowhere in the doc. |

**Tally:** the math keystone (9, 24, 10) and a handful of empirical papers (2, 6, 19, 23)
hold up to their own statements; **one paper (22) is retracted**; **two (27, 28) are
structurally broken**; and **the site mis-states the papers in ~16 of 28 entries.** The
biggest single liability is **self-inflicted**: `data.ts` is wrong more often than the
papers are.

## 7.2 Site (`data.ts`) corrections required — grouped by severity

**Blocker (factually false / reputational):**
1. **Paper 22 is RETRACTED on Zenodo** — remove it from the live "domains" / paper list,
   or annotate it explicitly as retracted. Presenting a retracted result as a "win" is
   the kind of thing a hostile referee screenshots. (Also drop it from `STATS.papers`
   and the domain count.)
2. **Paper 8** (`howToReproduce`): replace `−(α+1)/α = −1.50` with
   **`−(d/α − 1) = −(3 − α)/α = −1.50` (d = 3)**; change error bar **±0.61 → ±0.31**;
   change "IBM Quantum … 15 qubits" → **"24 qubits from 12 published experiments"**;
   change `dataPoints` "15 superconducting qubits" → **24**.
3. **Paper 27** (`keyResult`): remove the fabricated **"χ² = 0.74, p = 0.994"** — no such
   test exists in the paper. State the real result honestly (Kruskal–Wallis H=68.68,
   p=1.93×10⁻¹³ shows regions *differ*; note the pooled data does **not** confirm β=1.2).
   The DOMAINS string "p = 0.0037" is also not the paper's number (Mann–Whitney p=0.0044).
4. **Paper 26** (`keyResult`): remove **"4.7σ, p = 3.2×10⁻⁶"** — not in the paper. The
   paper claims only ">5σ" (qualitative) and the 8/8 is an SNR≥8 sub-slice.
5. **Paper 15** (`keyResult`): remove **"stochastic resonance at σ ≈ 0.3"** — the paper
   found **no resonance**. Fix R² 0.997 → **0.996**.

**High (wrong number / wrong baseline):**
6. **Paper 13** (`dataPoints`): "486 measurements, 243 events" → **"486 events → 109
   quality-filtered measurements"**; "73/109 events" → **measurements**. (`243` is fictitious.)
7. **Paper 4** (`keyResult`): "beats Newtonian" → **"beats the NFW dark-matter halo"**;
   "p < 10⁻⁶" → **"p = 1.7×10⁻⁶"**.
8. **Paper 17** (`keyResult`): "χ² = 4.4 vs 33.5" are **reduced χ²/N**, not totals —
   either relabel as χ²/N or use the totals **110.6 vs 838.4**.
9. **Paper 16** (`prediction`): replace `w = −(2α−1)/(2α+1)` with the only correct form
   **`w = −1 + (2−α)/3 = −11/15`**; reframe "Δχ²=0.32 vs ΛCDM" as **"statistically
   indistinguishable from ΛCDM"** (the paper's own words), not a win.
10. **Paper 18** (`howToReproduce`): replace `d_s = 2α/2` with **`d_s = 2d/α = 10/3`
    (2D horizon)**; "τ ~ M³·²" → **M^(10/3) ≈ M³·³³**.
11. **Paper 5** (`dataSource`): "ATLAS/CMS" → **"CMS (JHEP 07, 013 (2017))"**; footnote
    that 6.7σ is vs LO/NLO with no systematics.
12. **Paper 14** (`keyResult`): "40% stronger" → **"129% vs the 10-node graph"**.
13. **Paper 24** (`dataPoints`): "0/500,000 random graphs match" → **"100,000 graphs;
    0.004% match the full spectrum, 3% have any eigenvalue within 0.001 of 6/5."**

**Medium (provenance / wording / metadata hygiene):**
14. **Paper 1**: ORCID on the PDF is **0000-0001-5680-3804** (not the canonical
    0009-0005-7399-3204) — reconcile/correct on Zenodo; `prediction` should be the
    δ/γ ≈ 7:1 *band-transfer* ratio, not "cross-frequency coupling"; `dataSource` is
    **Radin 2004**, not a "Grinberg-Zylberbaum dataset."
15. **Paper 3** (`keyResult`): "excess reproduced" → **"Δχ²=4.20 (2.0σ) improvement, 1
    free parameter"** (it does not reproduce MiniBooNE's 4.8σ).
16. **Paper 9 "λ₆ = 6/5"**: the value is the **7th eigenvalue in ascending order
    (index 6)**. `data.ts` Paper-9 `prediction` calls it "the 6th eigenvalue" — off by
    one. Also the error is ~4.4×10⁻¹⁶, so "< 10⁻¹⁶" should be "< 10⁻¹⁵" (matches Paper 9).
17. **Author identity**: papers 8, 9, 10, 11, 12 print **"Carlos A. Freeman"**; the rest
    print **"Carlos W. Freeman"**; papers 19, 21 and the PRL print **no ORCID**. Pick one
    name + ORCID and make every Zenodo record and the site agree. A referee cross-checking
    ORCID against a paper that says "A." will distrust the whole corpus.
18. **PRL** (`PRL` object): title says **"Thirteen"** domains while `STATS.domains = 30`;
    decide whether the public count is 13 (PRL), "24" (Paper 24's text), or 30, and make
    the headline consistent. "LQ19911"/"Desk rejected" are external facts not in the
    Zenodo doc — fine to keep, but they cannot be verified from the record.

## 7.3 The null-test problem (read this before quoting any "uniqueness")

The corpus runs *four different* random-graph null tests and gets *four different*
answers, none matching the site:

| Paper | N random graphs | Result |
|---|---|---|
| 19 | 10,000 | 1.5% within tol of 6/5; Fisher conjunction p=0.0014 |
| 20 | 100,000 | **p = 0.058 — fails 0.05** (near-6/5 is generic for large lattices) |
| 24 | 100,000 | 3.0% have an eigenvalue ≈6/5; **0.004% match the full spectrum** |
| 25 | 100,000 | 3.01% have λ≈6/5 |
| site | "500,000" | "0 match" — **appears in no paper** |

The honest, defensible statement is **Paper 24's**: among 11-node/24-edge graphs, ~3%
have *some* eigenvalue near 6/5 but only ~0.004% reproduce the *whole* spectrum — so the
distinctiveness is in the **full spectral signature**, not in "6/5 is rare." Paper 20's
p=0.058 actively undercuts the "6/5 is universal/special" framing and should be quoted
*with* that caveat, not as a win.

## 7.4 The single first-principles exponent table (delivers Part 3.4)

Every exponent the corpus uses, derived from the *same* objects — the fractional
Laplacian `(−Δ)^(α/2)`, spatial dimension `d`, and the graph eigenvalues `λ_k` — with
α = 6/5 plugged in. **Verified numerically.** This is the table that turns "toolbox of
post-hoc formulas" into "one operator." Build it into the site and the letter.

| Domain (paper) | Exponent relation | Origin | Value at α=6/5 |
|---|---|---|---|
| Green's fn / potential (1,4,6,11,21) | `G(r) ∝ r^(α−d)` | fractional Laplacian fundamental soln, d=3 | r^(−9/5) = r⁻¹·⁸ |
| EEG spectral transfer (1) | `T(f) ∝ f^(−α/2)` | half-order spectral kernel | f^(−0.6) |
| PSD slope / "1/f" (2,12) | `β = α` | S(f) ∝ f^(−α) | 1.2 |
| Hurst (12) | `H = α/2` | fBm self-similarity | 0.6 |
| Anomalous diffusion (12) | `⟨x²⟩ ∝ t^α` | fractional kinetics | t^1.2 |
| Pedestal width (12) | `Δ ∝ (∇p)^(−1/α)` | balance of fractional flux | −5/6 |
| ELM Weibull shape (12) | `k = α` | avalanche size law | 1.2 |
| LHC dijet correction (5) | `(M/Λ)^(2−α)` | propagator UV modification | 0.8 |
| Cuprate self-energy (17) | `β = 2 − α` | optical memory function ω^(2−α) | 4/5 = 0.8 |
| GW ringdown amplitude (13,26) | `A(t) ∝ t^(−α/2)` | fractional dissipation tail | t^(−0.6) |
| **Qubit T₁ (8)** | **`γ = −(d/α − 1) = −(3−α)/α`** | DOS g(E)∝E^(d/α−1), d=3 | **−3/2 = −1.50** |
| **Dark-energy EOS (16)** | **`w = −1 + (2−α)/3`** | fractional Friedmann | **−11/15 = −0.733** |
| **BH log entropy (18)** | **`c_log = −(d_s/2 − 1)`, `d_s = 2d/α`** | spectral dim, d=2 horizon → d_s=10/3 | **−2/3** |
| BH evaporation (18) | `τ ∝ M^(d_s)` | d_s = 10/3 | M^(10/3) ≈ M³·³³ |
| iEEG region slope (27) | `β_k = 2α/λ_k` | mode-resolved spectral exponent | 2.0 at λ₆; 1.56–2.64 across modes |
| Josephson offset (7) | `α_JJ = (2−α)ζ(α)/(2π N^(α−1))` | inter-plane sum, N≈5.6×10⁹ | 0.008 |
| Atomic form-factor cusp (23) | `F(Q) ∝ 1 − c·Q^α` | fractional momentum kernel | Q^1.2 |
| Neutrino coupling (3) | `(E₀/E)^α` | energy-dependent mixing | (E₀/E)^1.2 |

**What this table also exposes:** the relations are *not* all equally principled. The
"standard fractional-calculus" rows (Green's function r^(α−d), Hurst α/2, PSD β=α,
diffusion t^α, propagator (M/Λ)^(2−α)) are textbook consequences of `(−Δ)^(α/2)`. The
*single-domain* rows — qubit −(3−α)/α, dark energy −1+(2−α)/3, BH 2d/α — each require a
domain-specific derivation, and the corpus prints **mutually inconsistent forms** for two
of them (dark energy has 4 printed formulas; BH has an abstract form that drops a factor
of 2 the body restores). Demote or re-derive any row you cannot put in this table from
first principles with no free choices.

## 7.5 Paper 8 reconciliation (task item 4)

The three numbers in play and what actually produces −3/2:

- `−(α+1)/α` → **−1.833** (the `data.ts` formula; wrong — and not in the paper).
- `−(α/2 + α²/4)` → **−0.96** (an old legacy-page form; wrong).
- `−(5/4)α` → **−1.50** (right *value*, wrong *function* — coincidence at α=6/5 only).
- **`−(d/α − 1) = −(3 − α)/α` → −1.50 (d=3): the paper's actual derivation, correct.**

The paper builds it honestly: a fractional density of states `g(E) ∝ E^(d/α − 1)` gives
`T₁ ∝ f^(−(d/α − 1))`, and at d=3, α=6/5 that is exactly −3/2. **Action:** put
`−(d/α − 1)` on the site verbatim and delete the other forms. (Caveat to keep the paper
honest: its headline −2.07 ± 0.31 includes −1.50 *and* a wide band; remove the high-leverage
72 GHz point and the fit moves to −1.05, so "QM −0.5 excluded" is carried by one datum.)

## 7.6 The γ / α_d reconciliation (the "forking exponents")

The tension you flagged — `γ ≈ α_d − 1` in one document vs `γ = 1 − α_d` in another, and
"neither gives pink, γ ≈ 1" — dissolves once you separate **three distinct exponents the
manuscripts all call by 1/f-ish names**:

1. **PSD slope** of the field itself: `β = α_d` (Paper 12, explicit:
   `S(f) ∝ f^(−α) = f^(−1.2)`). This **is** "pink-ish" — γ ≈ 1.2, i.e. slightly steeper
   than ideal pink (γ=1). This is the one to report as the coherence-meter 1/f input.
2. **Spectral-transfer kernel** between coupled planes: `f^(−α_d/2) = f^(−0.6)`
   (Paper 1). This is a *transfer function*, not the PSD slope — calling its exponent
   "γ" is the source of the `γ = 1 − α_d`-looking algebra (0.6 ≈ 1 − α_d/2, not 1 − α_d).
3. **Mode-resolved slope** `β_k = 2α_d/λ_k` (Paper 27), which only equals α_d at the
   special mode where λ_k = 2 and equals **2.0** at the keystone λ₆ = 6/5.

So: there is no single γ. The defensible statement is **β_PSD = α_d = 6/5** (Paper 12's
relation, which is a standard fractional-noise result), and the coherence meter's "1/f"
channel should be pinned to *that* — γ ≈ 1.2, reported as "slightly steeper than pink,"
**not** forced to γ ≈ 1. The `α_d − 1` (=0.2) and `1 − α_d` (=−0.2) forms in the
manuscripts are **sub-leading / transfer-function exponents mislabeled as the PSD slope**;
either rename them (κ, η) or delete them. Pick `β = α_d` as canonical and make every
document use that symbol for the 1/f slope.

## 7.7 Revised "strongest defensible result"

With Paper 28 demoted (C2), the ranking by *referee-survivability* is:

1. **The math keystone (Papers 9 + 24 + 10).** λ₆ = 6/5 is exact, the eigenvector is the
   exact bilateral mode (both independently reproduced here, ‖Lv−1.2v‖ = 0), and **6/5 is
   the unique nontrivial rational in the spectrum** (Part 2.1). This is the one claim no
   referee can dispute, and `/verify` makes it self-checking. *Everything public should
   lead here.* Fix Paper 9/10's "Carlos A." byline and the index-6/7 wording first.
2. **Atomic form factors (23)** — cleanest *empirical* match: zero-parameter, public
   coefficients, reproducible, arithmetic honest. Its weakness (β=1.41 vs 1.20) is stated
   in the paper, which is exactly the honesty that survives review. A better lead than any
   σ-stacked result.
3. **Cuprate β = 2 − α (17)** and **fusion (12)** — both derive from the table in 7.4, but
   fix the χ²/N mislabeling (17) and own the too-good χ²/dof (12).
4. **Honest ties** — GR recovery (6) and dark energy (16) — reframe as "consistent with /
   indistinguishable from" the standard model, which is *true* and costs nothing.

Demote for the flagship: **28 (unsubstantiated priority), 22 (retracted), 27 (own data
excludes the prediction), 5 (LO strawman 6.7σ), 21 (vacuous "2,697 OoM"), 26 (4.7σ not in
paper).** Stacked Fisher σ across 13/26 (shared GWOSC data) and the PRL's three
incompatible global p-values should be dropped entirely.

## 7.8 Revised prioritized fix list

1. **Remove/annotate the retracted Paper 22.** (7.2 #1) — do this today.
2. **Fix every wrong formula in `data.ts`**: Paper 8 `−(d/α−1)`, Paper 16 `−1+(2−α)/3`,
   Paper 18 `d_s=2d/α`. (7.2 #2, #9, #10)
3. **Delete fabricated statistics** that are in no paper: Paper 27 "χ²=0.74/p=0.994",
   Paper 26 "4.7σ", Paper 15 "stochastic resonance", Paper 13 "243 events". (7.2 #3–6)
4. **Reconcile the keystone story** (provenance C1 of Part 1.1 + the "6th vs 7th
   eigenvalue" wording + author name/ORCID). One narrative, one name, one ORCID.
5. **Replace strawman/inverted baselines**: Paper 4 "Newtonian"→NFW(+MOND), Paper 5
   ATLAS→CMS-with-systematics, Paper 16/6 "win"→"tie".
6. **Publish the 7.4 exponent table** as the corpus's spine — it is the single best answer
   to the "forking paths / numerology" objection.
7. **Build the public lead around the eigenvalue keystone (9/24), not Paper 28.**
8. **Pre-register** any genuinely new prediction with a timestamped artifact — Paper 28
   shows exactly why an undated "we predicted this" claim is worthless. *That* is how to
   make a real pre-data result; do it before, not after, the next dataset drops.

*Verification provenance: all 29 records fetched from the Zenodo API and read June 2026;
eigenvalue/eigenvector and every exponent in 7.4 re-derived independently
(`‖Lv−1.2v‖ = 0`, λ₆−6/5 = 4.4×10⁻¹⁶, all formula values reproduced).*

---

# Part 8 — Paper 22 retraction: what went wrong, and where the effort should go

Paper 22 has been **removed from the live site** (it is retracted on Zenodo). This is not
"delete and forget" — the underlying *question* is legitimate, the *execution* was not.
The Zenodo record carries the author's own retraction note, which is unusually candid and
is the right diagnosis:

> *"RETRACTED: Published without author approval. Analysis contains circular correlations
> (MT eigenvalue shift defined proportional to lipophilicity then correlated with
> lipophilicity). Did not analyze actual neural recording data from Eisen and Miller 2026.
> Conceptual framework may be revisited in future work with proper quantitative analysis."*

## 8.1 What it claimed
That the bilateral eigenmode (λ = 6/5) of a 13-protofilament microtubule lattice acts as a
peristaltic ion pump (121× Ca²⁺ thermal, 302,671× driven), that anesthetics work by
shifting that eigenvalue, and — reaching well past the physics — that this is the mechanism
of consciousness and its loss under anesthesia (with "NDE download window" / field-state
language).

## 8.2 Why it is wrong (three independent failures, all confirmed)
1. **Circularity (fatal).** The eigenvalue shift Δλ was *defined* proportional to anesthetic
   lipophilicity and then "found" to correlate with lipophilicity (Meyer-Overton). That
   correlation is a tautology, not a result. The paper's own "triple correlation" is one
   collinear quantity counted three times (it even admits the predictors "measure the same
   topological pathway").
2. **No real data.** It never analyzed the Eisen & Miller (2026) neural recordings it cited
   — the one out-of-sample test that could have made it falsifiable.
3. **Internal contradiction + underived numbers.** It asserts Meyer-Overton r = 0.995 in
   prose while its *own* Table II computes r = 0.942; the 302,671× "driven" enhancement
   appears once with no derivation; and the consciousness/NDE framing is unfalsifiable and
   actively poisons the credibility of the testable parts.

## 8.3 What actually survives (the salvageable kernel)
- **The MT lattice eigenvalue near 6/5 is real** — but that is *Paper 20's* (non-retracted)
  domain, and even there the null test is **p = 0.058** (see 7.3). So this is a weak prior,
  not a foundation.
- **The Meyer-Overton regularity is real** (it is decades-old pharmacology). MPFST is
  allowed to *try* to explain it — but only via a mechanism whose Δλ is computed
  **independently of** the quantity it then predicts.

## 8.4 The path the effort should take (a non-circular redo)
If revisited (as the author intends), the work has to be rebuilt so the prediction cannot
be true by construction:
1. **Compute Δλ from first principles.** Model anesthetic binding *geometrically* (which
   tubulin pocket, which graph edges/nodes it perturbs, by how much) → perturb the MT graph
   Laplacian → read off Δλ. This Δλ must depend on **binding geometry, not on lipophilicity**.
2. **Then** test whether that independently-derived Δλ predicts anesthetic potency (1/MAC).
   Only this ordering breaks the circularity the retraction names.
3. **Use the real data.** Analyze the Eisen & Miller (2026) recordings as a genuine
   out-of-sample test; expand far beyond n = 5 agents; report the collinear predictors as
   **one** correlation, with the honest r = 0.942.
4. **Derive or drop** the 121× / 302,671× enhancement factors — no bare numbers.
5. **Strip the consciousness/NDE framing entirely** from any physics submission; it is
   unfalsifiable and it is what makes editors stop reading.
6. **Pre-register** the prediction with a timestamp *before* touching the data — the exact
   discipline Paper 28 lacked (see C2).

**Bottom line:** the topological-pump idea is *unproven*, not *refuted*. It belongs in
"future work," precisely as the retraction note says — and it must not reappear as a
"domain win" until a non-circular, real-data, pre-registered version exists. Removing it
from the site now is the honest move; keeping the salvage plan here is the constructive one.
