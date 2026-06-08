# Design Doc: Copy Prompt Button & Saved Blocks Editing

This design document outlines the additions of a premium copy button to the user prompts on the `AI_Workstation.html` home view dashboard and an edit modal for saved blocks in `PromptStudio.html`.

---

## 1. Copy Prompt Button (Dashboard)

### Proposed Design & Approach
Add a header flexbox container inside each `.use-case-box` holding the title `<h4>USER PROMPT</h4>` on the left and a clean, responsive "Copy" button on the right.

### Style Additions (CSS)
Add new styles for the header flexbox and copy buttons matching the current dark glassmorphism theme:
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

### Markup Changes (HTML)
Modify the structure inside `.use-case-box` to wrap the heading and add the button:
```html
<div class="use-case-box-header">
    <h4>USER PROMPT</h4>
    <button class="copy-prompt-btn" onclick="copyPrompt(this)">
        <i data-lucide="copy"></i><span>Copy</span>
    </button>
</div>
```

### Logic Additions (JS)
Add a reusable function inside the `<script>` tag:
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

---

## 2. Saved Blocks Editing Modal (Prompt Studio)

### Proposed Design & Approach
Add an "Edit" icon button (`edit-2` icon) next to the "Delete" icon button for each item in the "保存済みブロック (Saved Library)" list.
Clicking the Edit button opens a dark-themed modal overlay containing inputs for the block title and block content, allowing multiline editing.

### Style Additions (CSS in PromptStudio.html)
Add modal styles matching the glassmorphism dark theme of Prompt Studio:
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

### Markup Changes (HTML in PromptStudio.html)
1. Add the modal layout just before `</body>`:
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

2. Add the Edit button inside `loadSavedIndividualBlocksList()` template string next to delete-btn:
```html
                    <button class="block-action-btn edit-btn" onclick="editSavedIndividualBlock('${savedBlock.id}', event)" title="編集" style="margin-right: 4px;">
                        <i data-lucide="edit-2" style="width:12px; height:12px;"></i>
                    </button>
```

### Logic Additions (JS in PromptStudio.html)
Add JS logic to show, hide, and save changes to the block:
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
