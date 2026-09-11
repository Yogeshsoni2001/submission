import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DynamicControlsPage } from '../../pages/DynamicControlsPage';
import { FileUploadPage } from '../../pages/FileUploadPage';
import * as path from 'path';
import * as fs from 'fs';

test.describe('UI Automation - Page Object Model', () => {

  test.describe('Login scenarios', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      await loginPage.goto();
    });

    test('valid login', async () => {
      await loginPage.login('tomsmith', 'SuperSecretPassword!');
      await expect(loginPage.getFlashMessage()).toContainText('You logged into a secure area!');
    });

    test('invalid credentials', async () => {
      await loginPage.login('tomsmith', 'WrongPassword!');
      await expect(loginPage.getFlashMessage()).toContainText('Your password is invalid!');
    });

    test('empty field validation (HTML5)', async ({ page }) => {
      // The form does not have client side empty validation.
      // Submitting empty fields simply triggers invalid login logic on the backend.
      await loginPage.login('', '');
      await expect(loginPage.getFlashMessage()).toContainText('Your username is invalid!');
    });
  });

  test.describe('Form Authentication', () => {
    test('verify redirect after successful login and full logout flow', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      
      // Login
      await loginPage.login('tomsmith', 'SuperSecretPassword!');
      await expect(page).toHaveURL(/.*secure/);
      await expect(loginPage.getFlashMessage()).toContainText('You logged into a secure area!');
      
      // Logout
      await loginPage.logout();
      await expect(page).toHaveURL(/.*login/);
      await expect(loginPage.getFlashMessage()).toContainText('You logged out of the secure area!');
    });
  });

  test.describe('Dynamic Controls', () => {
    test('handle checkbox enable/disable and add/remove with proper waits for async DOM changes', async ({ page }) => {
      const dynamicControlsPage = new DynamicControlsPage(page);
      await dynamicControlsPage.goto();
      
      // Checkbox Remove/Add
      const checkbox = dynamicControlsPage.getCheckbox();
      await expect(checkbox).toBeVisible();
      
      await dynamicControlsPage.removeCheckbox();
      await expect(dynamicControlsPage.getMessage()).toHaveText("It's gone!");
      await expect(checkbox).toBeHidden();
      
      await dynamicControlsPage.addCheckbox();
      await expect(dynamicControlsPage.getMessage()).toHaveText("It's back!");
      await expect(checkbox).toBeVisible();

      // Input Enable/Disable
      const input = dynamicControlsPage.getInput();
      await expect(input).toBeDisabled();
      
      await dynamicControlsPage.enableInput();
      await expect(dynamicControlsPage.getMessage()).toHaveText("It's enabled!");
      await expect(input).toBeEnabled();
      
      await dynamicControlsPage.disableInput();
      await expect(dynamicControlsPage.getMessage()).toHaveText("It's disabled!");
      await expect(input).toBeDisabled();
    });
  });

  test.describe('File Upload', () => {
    test('upload a test file programmatically and verify the success confirmation', async ({ page }) => {
      const fileUploadPage = new FileUploadPage(page);
      await fileUploadPage.goto();
      
      // Create a temporary file to upload
      const testFilePath = path.join(__dirname, 'test-upload.txt');
      fs.writeFileSync(testFilePath, 'This is a test file for upload.');
      
      try {
        await fileUploadPage.uploadFile(testFilePath);
        
        await expect(fileUploadPage.getHeaderText()).toHaveText('File Uploaded!');
        await expect(fileUploadPage.getUploadedFilesMessage()).toContainText('test-upload.txt');
      } finally {
        // Clean up
        fs.unlinkSync(testFilePath);
      }
    });
  });
});
