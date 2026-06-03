# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: registration.spec.ts >> Register new account with mismatched passwords
- Location: tests\registration.spec.ts:59:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "EstateFinder" [ref=e4] [cursor=pointer]:
        - /url: /
      - generic [ref=e5]:
        - link "Listings" [ref=e6] [cursor=pointer]:
          - /url: /listings
        - link "Sign in" [ref=e7] [cursor=pointer]:
          - /url: /users/sign_in
        - link "Sign up" [ref=e8] [cursor=pointer]:
          - /url: /users/sign_up
  - main [ref=e9]:
    - generic [ref=e11]:
      - heading "Create an account" [level=2] [ref=e12]
      - generic [ref=e13]:
        - generic [ref=e14]:
          - heading "1 error prohibited this user from being saved:" [level=5] [ref=e15]
          - list [ref=e16]:
            - listitem [ref=e17]: Email is invalid
        - generic [ref=e18]:
          - generic [ref=e19]: Name
          - textbox "Name" [active] [ref=e20]: Test User
        - generic [ref=e21]:
          - generic [ref=e22]: Email
          - textbox "Email" [ref=e23]: test_user_7121@example.com
        - generic [ref=e24]:
          - generic [ref=e25]: Password
          - text: (minimum 8 characters)
          - textbox "Password" [ref=e26]
        - generic [ref=e27]:
          - generic [ref=e29]: Password confirmation
          - textbox "Password confirmation" [ref=e31]
        - button "Sign up" [ref=e32] [cursor=pointer]
      - generic [ref=e33]:
        - link "Log in" [ref=e34] [cursor=pointer]:
          - /url: /users/sign_in
        - link "Didn't receive confirmation instructions?" [ref=e35] [cursor=pointer]:
          - /url: /users/confirmation/new
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | import { generateExistingUser, generateInvalidUser, generateMismatchedPasswords, generateUser } from "../utils/faker";
  3   | import { SignUpPage } from "../pages/SignUpPage";
  4   | 
  5   | test(
  6   |   "Register new account successfully",
  7   |   async ({ page }) => {
  8   |     
  9   |     const signUpPage = new SignUpPage(page);
  10  |     const user = generateUser();
  11  | 
  12  |     await signUpPage.navigateTo(process.env.BASE_URL!);
  13  | 
  14  |     await signUpPage.goToSignUpPage();
  15  | 
  16  |     await signUpPage.register(
  17  |       user.email,
  18  |       user.password,
  19  |       user.password
  20  |     );
  21  | 
  22  |     await signUpPage.wait10Seconds();
  23  | 
  24  |     await expect(await signUpPage.isRegistrationSuccessful()).toBe(true);
  25  | 
  26  |     await signUpPage.confirmRegistration(user.email);
  27  | 
  28  |     await expect(await signUpPage.isConfirmationSuccessful()).toBe(true);
  29  | 
  30  |   }
  31  | );
  32  | 
  33  | test(
  34  |   "Register new account with invalid email",
  35  |   async ({ page }) => {
  36  |     
  37  |     const signUpPage = new SignUpPage(page);
  38  |     const user = generateInvalidUser();
  39  | 
  40  |     await signUpPage.navigateTo(process.env.BASE_URL!);
  41  | 
  42  |     await signUpPage.goToSignUpPage();
  43  | 
  44  |     await signUpPage.register(
  45  |       user.email,
  46  |       user.password,
  47  |       user.password
  48  |     );
  49  | 
  50  |     await signUpPage.wait10Seconds();
  51  | 
  52  |     await expect(await signUpPage.isRegistrationSuccessful()).toBe(false);
  53  | 
  54  |     await expect(await signUpPage.isEmailInvalid()).toBe(true);
  55  | 
  56  |   }
  57  | );
  58  | 
  59  | test(
  60  |   "Register new account with mismatched passwords",
  61  |   async ({ page }) => {
  62  |     
  63  |     const signUpPage = new SignUpPage(page);
  64  |     const user = generateMismatchedPasswords();
  65  | 
  66  |     await signUpPage.navigateTo(process.env.BASE_URL!);
  67  | 
  68  |     await signUpPage.goToSignUpPage();
  69  | 
  70  |     await signUpPage.register(
  71  |       user.email,
  72  |       user.password,
  73  |       user.confirmPassword
  74  |     );
  75  | 
  76  |     await signUpPage.wait10Seconds();
  77  | 
  78  |     await expect(await signUpPage.isRegistrationSuccessful()).toBe(false);
  79  | 
> 80  |     await expect(await signUpPage.isPasswordMismatch()).toBe(true);
      |                                                         ^ Error: expect(received).toBe(expected) // Object.is equality
  81  | 
  82  |   }
  83  | );
  84  | 
  85  | test(
  86  |   "Register new account with duplicate email",
  87  |   async ({ page }) => {
  88  |     
  89  |     const signUpPage = new SignUpPage(page);
  90  |     const user = generateExistingUser();
  91  | 
  92  |     await signUpPage.navigateTo(process.env.BASE_URL!);
  93  | 
  94  |     await signUpPage.goToSignUpPage();
  95  | 
  96  |     await signUpPage.register(
  97  |       user.email,
  98  |       user.password,
  99  |       user.password
  100 |     );
  101 | 
  102 |     await signUpPage.wait10Seconds();
  103 | 
  104 |     await expect(await signUpPage.isRegistrationSuccessful()).toBe(false);
  105 |     await signUpPage.wait10Seconds();
  106 | 
  107 |     await expect(await signUpPage.isEmailAlreadyTaken()).toBe(true);
  108 | 
  109 |   }
  110 | );
  111 | test(
  112 |   "Register new account with short password",
  113 |   async ({ page }) => {
  114 |     
  115 |     const signUpPage = new SignUpPage(page);
  116 |     const user = generateExistingUser();
  117 | 
  118 |     await signUpPage.navigateTo(process.env.BASE_URL!);
  119 | 
  120 |     await signUpPage.goToSignUpPage();
  121 | 
  122 |     await signUpPage.register(
  123 |       user.email,
  124 |       "123456",
  125 |       "123456"
  126 |     );
  127 | 
  128 |     await signUpPage.wait10Seconds();
  129 | 
  130 |     await expect(await signUpPage.isRegistrationSuccessful()).toBe(false);
  131 |     await signUpPage.wait10Seconds();
  132 | 
  133 |     await expect(await signUpPage.isPasswordTooShort()).toBe(true);
  134 | 
  135 |   }
  136 | );
  137 | 
  138 | 
```