# Cato — Version 22 process and preservation audit

## Initial audit

The user requests a general attribution revision across all six individual collections 09–14, using Version 21 as the teaching base and Version 20 plus the original sources as attribution evidence. The later steering explicitly rejects fixing only the supplied examples. This review checks the process, completeness of the review record, preserved earlier material, and integrated artifact; it does not substitute for the source reviewers.

I read the chair brief, all three authoring handoffs and evidence ledgers, the actual Version 22 build and verification policy, and the independent problem-pair review. The three ledgers cover 69 memory pages, 46 problem-solving pages and 61 judgment pages, totaling all 176 original source pages. Their authoring methods compare complete Version 20 and Version 21 text with the corresponding original slide/PDF evidence, reuse earlier visual review where suitable, and identify directly reinspected citation images. The authors record available source-only references as well as Version 20 citations. This meets the generalized scope in the review record rather than treating Baddeley as the sole change.

The record clearly separates author self-checks from independent cross-review of another editor’s pair. The problem pair has an actual-source cross-review with exact final input hashes and exact reconstruction from the listed edits. Judgment and memory final cross-review remain required before full clearance.

Missing source dates and unnamed studies are documented rather than guessed. Model proposals, research analyses, source tasks and experiments are distinguished. The three narrow Version 22-only accuracy corrections were raised to and explicitly authorized by the chair, separately recorded in the judgment ledger, and are not silently represented as mere citation insertions. They concern farm/library counts, the monetary assumption in ultimatum acceptance, and association rather than causation in the insula result. Earlier Version 21 prose remains unchanged.

I independently ran `version22/verify.py`. It passes coverage of all 176 pages and 167 teaching pages, unchanged title/divider roles, the author-year citation exception with other Version 21 writing gates retained, and the preserved-file hash checks. The citation exception does not remove the remaining restrictions on measured figures, report labels, banned phrasing or fragments. I also read the additive wrapper and following-slide stylesheet: Version 22 adds an option and its own selected-state handling while keeping the earlier controls available. The new script intentionally wraps the previously installed controls; its inherited comment naming Version 20 is only a minor documentation imprecision.

Initial status: no process halt. Final clearance requires all three independent cross-review reports at current input hashes, rebuilt runtime equality, final focused test logs, and actual browser switching/attribution/following-slide/persistence/mobile evidence. No deployment success is claimed by this initial audit.

## Final independent process disposition

Verdict: **APPROVE the reviewed Version 22 snapshot for publication.** This is a process, provenance and integration audit, not a substitute for the cross-reviewers’ scientific judgments. No deployment success is claimed here.

I independently read all three final cross-review reports. The reviewers explicitly approve another editor’s pair rather than their own work. I computed each of the six current input hashes and verified it occurs in the corresponding final cross-review. All 176 actual runtime blocks exactly equal the parsed current author inputs. The page-audit ledgers contain exactly 69 + 46 + 61 entries, covering all six source collections. The final verification record’s six input hashes and runtime hash match the actual files, and its 75 changed-page count is consistent with the recorded lists. The earlier-file preservation verifier independently passes. The final inputs contain natural attributions, source-only references and continuation-page credits; they do not limit the revision to the user’s Baddeley example.

The actual strengthened browser run passes switching among Versions 20, 21 and 22 in all six collections, renderer-output equality for all 176 source pages, the requested Baddeley (2000) and other working-memory citations, following-slide sticky positioning, decoded original-slide presence, saved selection after reload, mobile overflow and runtime-error checks. I read `/private/tmp/psyc22-browser.log` directly and inspected the final desktop screenshot with the original episodic-buffer slide and the new citation visible beside it, plus the mobile teaching screenshot. The first screenshot’s blank source pane was a lazy-image evidence gap; the chair strengthened the test to decode the actual image and retook the evidence. That concern is resolved without claiming the earlier screenshot already proved it.

The wrapper’s inherited comment was corrected to identify Version 21 as the installed control layer. Earlier editions and original data remain byte-identical under the preservation record. Missing dates are disclosed in the source ledgers, not fabricated or presented as newly verified history. The three narrow accuracy fixes are explicitly recorded and independently cross-reviewed. No board objection is dropped or overridden to obtain a sign-off.

Current integrated artifact SHA-256:

- `psyc301-v22-data.js`: `214d315dfde5bb21efa4a693458292b100d13ecc5ccc3c2b2c7cf8c2c18b5829`
- `psyc301-v22.js`: `e2522b969b8bdfd8e7c14817a198003091175ebf476ba5ee36e10924683ca574`
- `psyc301-v22.css`: `8f1cea93d6716e6f3d58b58d3a3f7b789a590a7bc9eb06f6735675a9c0dc0b98`
- `index.html`: `36669e6ef6edd870f0256e15c6bf6b8c713aaba0bf8d5f47ee4e2a880a2c357e`
- `share.html`: `fe558b37526686b018022d0259b5e8af17ee15d9ba01dfac8a48a40624c4c98a`
