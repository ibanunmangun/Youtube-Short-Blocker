# Technical Planning: YouTube Shorts Block

## Workflow
1. **Brainstorming & Design**: Finalize features and approach.
2. **Setup**: Initialize manifest and core extension files.
3. **Implementation**:
   - Content script to detect Shorts.
   - CSS or JS to hide Shorts elements.
4. **Testing**: Manual verification on various YouTube pages.
5. **Finalization**: Packaging and documentation.

## Edge Case / Blind Spot
- **Blind Spot**: YouTube often updates its website's structure (the "names" of the buttons and sections). If they change how a Short is labeled in their code, our extension might stop seeing them until we update it.
