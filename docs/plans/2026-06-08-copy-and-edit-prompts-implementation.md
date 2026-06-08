# Copy and Edit Prompts Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Add a copy prompt button to the dashboard (AI_Workstation.html) and an edit modal for saved individual blocks (PromptStudio.html).

**Architecture:** 
1. Use flex headers inside dashboard prompt cards to place a styled glassmorphism Copy button. Use the Clipboard API to copy prompt text with dynamic icon states.
2. Implement a vanilla CSS/HTML modal in PromptStudio.html to edit saved individual blocks from LocalStorage, triggered by a new edit button in each block item.

**Tech Stack:** HTML5, CSS3 (Vanilla), JavaScript (Vanilla), Lucide Icons

---

### Task 1: Add Copy Prompt Button to AI_Workstation.html

**Files:**
- Modify: `D:\Antigravity\Web Tool\AI_Workstation.html`

**Step 1: Add CSS Styles**
Modify the `<style>` section of `AI_Workstation.html` to add the `.use-case-box-header`, `.copy-prompt-btn`, and `.copy-prompt-btn.success` rules.
Target location: Insert around line 299 (before `/* --- Status Bar --- */`).
Code to add:
```css
        .use-case-box-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        .copy-prompt-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border);
            color: var(--text-dim);
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-family: inherit;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s ease;
        }

        .copy-prompt-btn:hover {
            background: rgba(26, 115, 232, 0.15);
            border-color: var(--primary);
            color: var(--text-main);
        }

        .copy-prompt-btn i {
            width: 12px;
            height: 12px;
        }

        .copy-prompt-btn.success {
            background: rgba(52, 168, 83, 0.15);
            border-color: #34A853;
            color: #34A853;
        }
```

**Step 2: Update HTML Structure**
Wrap `<h4>USER PROMPT</h4>` in `.use-case-box-header` and insert the copy button for both Use Case cards.
Target locations: Around lines 431-433 and 455-457.
Code changes:
```html
<!-- Use Case 1 -->
<div class="use-case-box">
    <div class="use-case-box-header">
        <h4>USER PROMPT</h4>
        <button class="copy-prompt-btn" onclick="copyPrompt(this)">
            <i data-lucide="copy"></i><span>Copy</span>
        </button>
    </div>
    <div class="use-case-prompt">
        「Firebase Hosting + Firestore + Gemini APIを使って、シンプルなTODOアプリを一から作って。<br>
        最新のベストプラクティスを守って、セキュリティも考慮して。」
    </div>
</div>

<!-- Use Case 2 -->
<div class="use-case-box">
    <div class="use-case-box-header">
        <h4>USER PROMPT</h4>
        <button class="copy-prompt-btn" onclick="copyPrompt(this)">
            <i data-lucide="copy"></i><span>Copy</span>
        </button>
    </div>
    <div class="use-case-prompt">
        「BigQueryで売上データを分析するPythonパイプラインを作って。コスト最適化とWell-Architected Frameworkも適用。」
    </div>
</div>
```

**Step 3: Add copyPrompt function to Javascript**
Insert the `copyPrompt` function inside the script block of `AI_Workstation.html`.
Target location: Insert before `// Initialize with Home` (around line 550).
Code to add:
```javascript
        function copyPrompt(button) {
            const box = button.closest('.use-case-box');
            const promptEl = box.querySelector('.use-case-prompt');
            const textToCopy = promptEl.innerText.trim();
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                button.classList.add('success');
                button.innerHTML = '<i data-lucide="check"></i><span>Copied!</span>';
                lucide.createIcons();
                
                setTimeout(() => {
                    button.classList.remove('success');
                    button.innerHTML = '<i data-lucide="copy"></i><span>Copy</span>';
                    lucide.createIcons();
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
```

**Step 4: Verify**
Open the page in the browser (or run a browser test) and click the Copy button. Confirm that:
1. The text is copied to the clipboard.
2. The button transitions to green "Copied!" with a check icon.
3. The button transitions back to "Copy" with a copy icon after 2 seconds.

**Step 5: Commit**
Run command:
```bash
git add "D:\Antigravity\Web Tool\AI_Workstation.html"
git commit -m "feat: add copy prompt button to AI workstation dashboard"
```

---

### Task 2: Add Edit Button and Modal to PromptStudio.html

**Files:**
- Modify: `D:\Antigravity\Web Tool\PromptStudio.html`

**Step 1: Add CSS Styles**
Add modal overlay, modal content, inputs, textarea, and modal action buttons styles to the `<style>` section of `PromptStudio.html`.
Target location: Around line 757 (before `</style>`).
Code to add:
```css
        /* Modal Style */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.2s ease-out;
        }

        .modal-content {
            background: #121218;
            border: 1px solid var(--border);
            border-radius: 16px;
            width: 500px;
            max-width: 90%;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-header h3 {
            font-size: 16px;
            font-weight: 700;
            color: white;
        }

        .modal-close {
            background: none;
            border: none;
            color: var(--text-dim);
            cursor: pointer;
            font-size: 20px;
        }

        .modal-close:hover {
            color: white;
        }

        .modal-body {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .modal-label {
            font-size: 12px;
            color: var(--text-dim);
            font-weight: 600;
        }

        .modal-input {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 10px;
            color: white;
            font-family: inherit;
            font-size: 13px;
            width: 100%;
            box-sizing: border-box;
        }

        .modal-textarea {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 10px;
            color: white;
            font-family: 'Space Mono', monospace;
            font-size: 12px;
            width: 100%;
            height: 150px;
            resize: vertical;
            box-sizing: border-box;
        }

        .modal-input:focus, .modal-textarea:focus {
            border-color: var(--primary);
            outline: none;
        }

        .modal-footer {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            margin-top: 8px;
        }

        .btn-modal {
            padding: 10px 16px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn-modal.cancel {
            background: transparent;
            border: 1px solid var(--border);
            color: var(--text-dim);
        }

        .btn-modal.cancel:hover {
            color: white;
            background: rgba(255,255,255,0.05);
        }

        .btn-modal.save {
            background: var(--primary);
            border: none;
            color: white;
        }

        .btn-modal.save:hover {
            background: var(--primary-hover);
        }
```

**Step 2: Add Modal Markup**
Append the modal overlay HTML structure to the container list.
Target location: Insert right before the `</body>` tag (around line 933).
Code to add:
```html
    <!-- Edit Saved Block Modal -->
    <div class="modal-overlay" id="editBlockModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>ブロックの編集 (Edit Saved Block)</h3>
                <button class="modal-close" onclick="closeEditModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <label class="modal-label">ブロック名</label>
                    <input type="text" id="editBlockTitle" class="modal-input">
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <label class="modal-label">プロンプト内容</label>
                    <textarea id="editBlockContent" class="modal-textarea"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-modal cancel" onclick="closeEditModal()">キャンセル</button>
                <button class="btn-modal save" id="btnSaveEditBlock">保存</button>
            </div>
        </div>
    </div>
```

**Step 3: Modify loadSavedIndividualBlocksList HTML Generation**
Inject the Edit button next to the Delete button inside `loadSavedIndividualBlocksList()`.
Target location: Around lines 1425-1428.
Code change:
```html
                    <button class="block-action-btn edit-btn" onclick="editSavedIndividualBlock('${savedBlock.id}', event)" title="編集" style="margin-right: 4px;">
                        <i data-lucide="edit-2" style="width:12px; height:12px;"></i>
                    </button>
                    <button class="block-action-btn delete-btn" onclick="deleteSavedIndividualBlock('${savedBlock.id}', event)" title="削除">
                        <i data-lucide="trash-2" style="width:12px; height:12px;"></i>
                    </button>
```

**Step 4: Implement JS logic for Edit, Close, and Save Modal actions**
Add JavaScript logic before the `// Run setup` comment (around line 1520).
Code to add:
```javascript
        let activeEditingBlockId = null;

        function editSavedIndividualBlock(id, event) {
            if (event) event.stopPropagation();

            const rawSaved = localStorage.getItem('block_prompt_studio_saved_individual_blocks');
            if (!rawSaved) return;

            let savedBlocksList = [];
            try { savedBlocksList = JSON.parse(rawSaved); } catch (e) {}

            const target = savedBlocksList.find(b => b.id === id);
            if (!target) return;

            activeEditingBlockId = id;
            document.getElementById('editBlockTitle').value = target.title;
            document.getElementById('editBlockContent').value = target.content;

            const modal = document.getElementById('editBlockModal');
            modal.style.display = 'flex';
            
            document.getElementById('btnSaveEditBlock').onclick = () => saveBlockEdit(id);
        }

        function closeEditModal() {
            const modal = document.getElementById('editBlockModal');
            modal.style.display = 'none';
            activeEditingBlockId = null;
        }

        function saveBlockEdit(id) {
            const newTitle = document.getElementById('editBlockTitle').value.trim();
            const newContent = document.getElementById('editBlockContent').value.trim();

            if (!newTitle) {
                showToast("ブロック名を入力してください。", "error");
                return;
            }
            if (!newContent) {
                showToast("プロンプト内容を入力してください。", "error");
                return;
            }

            const rawSaved = localStorage.getItem('block_prompt_studio_saved_individual_blocks');
            if (!rawSaved) return;

            let savedBlocksList = [];
            try { savedBlocksList = JSON.parse(rawSaved); } catch (e) {}

            const targetIndex = savedBlocksList.findIndex(b => b.id === id);
            if (targetIndex === -1) return;

            savedBlocksList[targetIndex].title = newTitle;
            savedBlocksList[targetIndex].content = newContent;

            localStorage.setItem('block_prompt_studio_saved_individual_blocks', JSON.stringify(savedBlocksList));
            showToast(`ブロック 「${newTitle}」 を更新しました。`);
            
            closeEditModal();
            loadSavedIndividualBlocksList();
        }
```

**Step 5: Verify**
Open the page, verify editing a saved block works correctly:
1. Click the edit button on any saved block. Confirm the modal appears.
2. Change the title and content.
3. Click "Save". Confirm the block is updated in the list with a toast notification.
4. Verify that LocalStorage is updated.

**Step 6: Commit**
Run command:
```bash
git add "D:\Antigravity\Web Tool\PromptStudio.html"
git commit -m "feat: add edit functionality for saved individual blocks in PromptStudio"
```
