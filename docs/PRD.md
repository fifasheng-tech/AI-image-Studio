# Image Studio Canvas Agent PRD

## Direction

Image Studio should evolve from a chat-first image generator into a canvas-first creative Agent. The canvas is the main workspace: users arrange prompts, references, parameters, generation steps, results, and follow-up edits in one place.

The current product keeps chat mode and all existing `/api/generate` and `/api/providers` behavior. Canvas mode adds an alternate workflow without changing provider switching, custom provider configuration, generation parameters, output directory, timeout, or retry policy.

## MVP Scope

- Keep chat mode available.
- Keep output files under `~/Downloads/Image Studio`.
- Add canvas nodes for text, templates, prompt optimization, reference images, parameters/providers, generation, and results.
- Support drag/drop nodes, panning, zooming, magnetic connections, and connections between arbitrary non-cyclic nodes.
- Let parameter/provider nodes default to a compact collapsed summary.
- Let users click generated images and edit in canvas context with a floating toolbar.
- Add a right-side Canvas Agent panel that can:
  - turn a text request into connected text, parameter, and generation nodes;
  - import the latest local output without calling upstream;
  - turn the selected result image into a reference image node;
  - trigger generation only when the user explicitly clicks generate.

## Non-Goals For This MVP

- Do not build a Photoshop-like standalone editor.
- Do not auto-retry paid generation calls.
- Do not auto-call upstream image generation while planning or importing.
- Do not migrate the whole frontend until canvas UX stabilizes.

## Editing Model

Generated images are editable by feeding the image back to the upstream image model as a reference. The current MVP supports manual layer boxes and editable text overlays inside the result node. Future precision features should use segmentation and OCR services to create real element and text layers automatically.

## Future Product Shape

- Home: prompt entry plus recent projects.
- Projects: list all canvas projects and outputs.
- Canvas: infinite canvas plus right Agent panel, asset strip, generation/edit history, and project persistence.

## Acceptance Checks

- Chat generation still works through existing APIs.
- Canvas can create and connect nodes without paid API calls.
- Canvas Agent can split a request into nodes.
- Import latest output shows a result node from the local output folder.
- Selecting a result image shows the floating toolbar above the image.
- Result images can be converted into reference nodes for second-pass generation.
