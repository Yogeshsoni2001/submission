import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DynamicControlsPage extends BasePage {
  private enableButton: Locator;
  private disableButton: Locator;
  private inputField: Locator;
  private message: Locator;
  private removeButton: Locator;
  private addButton: Locator;
  private checkbox: Locator;

  constructor(page: Page) {
    super(page);
    this.enableButton = page.getByRole('button', { name: 'Enable' });
    this.disableButton = page.getByRole('button', { name: 'Disable' });
    this.inputField = page.locator('#input-example input');
    this.message = page.locator('#message');
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.checkbox = page.locator('input[type="checkbox"]');
  }

  async goto() {
    await this.navigate('/dynamic_controls');
  }

  async enableInput() {
    await this.enableButton.click();
    await this.message.waitFor({ state: 'visible' });
  }

  async disableInput() {
    await this.disableButton.click();
    await this.message.waitFor({ state: 'visible' });
  }

  getInput() {
    return this.inputField;
  }

  getMessage() {
    return this.message;
  }

  async removeCheckbox() {
    await this.removeButton.click();
    await this.message.waitFor({ state: 'visible' });
  }

  async addCheckbox() {
    await this.addButton.click();
    await this.message.waitFor({ state: 'visible' });
  }

  getCheckbox() {
    return this.checkbox;
  }
}
