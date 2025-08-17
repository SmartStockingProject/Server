# Server
# 🛠️ Automatic Git Branch Creation Based on ClickUp Tasks

In this project, we maintain a consistent Git branch naming convention based on tasks from ClickUp.

To simplify the process and avoid manual errors, we provide a script that automatically creates branches from the terminal.

---

## 📦 Branch Naming Convention

The standard format is:
<type>/<task-id>-<PascalCaseDescription>
### Example:
script/86euh9ypn-CreationOfAutomaticBranchFormat
## 🚀 How to Create a New Branch

1. Make sure you're in the project root directory.
2. Run the following command in **PowerShell**: 
```powershell
npm run create-branch
```
3. You'll be prompted to enter three details:
    1. **Task ID** - The task identifier (e.g. 86euh9ypn)
    2. **Short Description** - A brief name for the task (e.g. creation of automatic branch format)
    3. **Branch Type** - One of: script, feature, bugfix, or hotfix

4. The script will automatically generate the branch and check it out.

