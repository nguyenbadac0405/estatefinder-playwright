# Bug Reports

## [BUG-001] A wrong error message is displayed when the password and confirmation password do not match.

* **Severity:** Medium

* **Flow:** Registration

* **Environment:**

  * OS: Window
  * Browser: Chrome 
  * Browser Version: 148.0.7778.216
  * Playwright Version: 1.60.0
  * Commit Hash:

* **Preconditions:**

### Steps to Reproduce

1. Navigate to https://qa-assignment.oivan.vn/
2. Click Sign Up button
3. Fill valid name and email
4. Fill password and another password to confirm password then Submit form

### Expected Result

A notice that the password and confirmation password do not match will be displayed.

### Actual Result

A notice that the email is invalid is displayed

### Evidence

* Failing test:

  * `tests/registration.spec.ts:80`
* Screenshot:

  * `artifacts/screenshots/BUG-001.png`
* Video:

  * `artifacts/videos/BUG-001.webm`
* Logs:

  ```text
  Email is invalid
  ```

### Suggested Fix / Hypothesis

Change the error text to "Passwords do not match"

---------------------------------------------------------------------------------------------------------

## [BUG-002] A wrong error message is displayed when the password is short.

* **Severity:** Medium

* **Flow:** Registration

* **Environment:**

  * OS: Window
  * Browser: Chrome 
  * Browser Version: 148.0.7778.216
  * Playwright Version: 1.60.0
  * Commit Hash:

* **Preconditions:**

### Steps to Reproduce

1. Navigate to https://qa-assignment.oivan.vn/
2. Click Sign Up button
3. Fill valid name and email
4. Fill password confirm password, that are less than 8 characters, then Submit form

### Expected Result

A notice that the password is too short.

### Actual Result

A notice that the email is invalid is displayed

### Evidence

* Failing test:

  * `tests/registration.spec.ts:111`
* Screenshot:

  * `artifacts/screenshots/BUG-002.png`
* Video:

  * `artifacts/videos/BUG-002.webm`
* Logs:

  ```text
  Email is invalid
  ```

### Suggested Fix / Hypothesis

Change the error text to "Passwords is too short"
