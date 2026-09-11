import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FileUploadPage extends BasePage {
  private fileInput: Locator;
  private uploadButton: Locator;
  private uploadedFiles: Locator;
  private header: Locator;

  constructor(page: Page) {
    super(page);
    this.fileInput = page.locator('#file-upload');
    this.uploadButton = page.locator('#file-submit');
    this.uploadedFiles = page.locator('#uploaded-files');
    this.header = page.locator('h3');
  }

  async goto() {
    await this.navigate('/upload');
  }

  async uploadFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
    await this.uploadButton.click();
  }

  getUploadedFilesMessage() {
    return this.uploadedFiles;
  }

  getHeaderText() {
    return this.header;
  }
}
