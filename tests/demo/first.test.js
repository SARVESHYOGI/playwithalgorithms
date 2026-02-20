import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Scroll down' }).click();
    await page.getByRole('button', { name: 'Scroll down' }).click();
    await page.getByRole('button', { name: 'Scroll down' }).click();
    await page.getByRole('button', { name: 'Scroll down' }).click();
    await page.getByRole('button', { name: 'Scroll down' }).click();
    await page.getByRole('button', { name: 'Scroll up' }).click();
    await page.getByRole('button', { name: 'Scroll up' }).click();
    await page.getByRole('button', { name: 'Scroll up' }).click();
    await page.getByRole('button', { name: 'Scroll up' }).click();
    await page.getByRole('button', { name: 'Select theme' }).click();
    await page.getByRole('button', { name: 'System' }).click();
    await page.getByRole('button', { name: 'Select theme' }).click();
    await page.getByRole('button', { name: 'Light' }).click();
    await page.getByRole('button', { name: 'Select theme' }).click();
    await page.getByRole('button', { name: 'Dark' }).click();
    await page.getByRole('button', { name: 'Select theme' }).click();
    await page.getByRole('button', { name: 'System' }).click();
    await page.getByText('Sorting', { exact: true }).click();
    await page.getByRole('button', { name: 'Let\'s Sort! 🚀' }).click();
    await page.getByRole('button', { name: 'Lets Try' }).first().click();
    await page.getByRole('button', { name: 'Randomize Elements' }).click();
    await page.getByRole('button', { name: 'Visualize' }).click();
    await page.getByRole('combobox').selectOption('100');
    await page.getByRole('button', { name: 'Start Sort' }).click();
    await page.getByRole('button', { name: '← Go Back' }).click();
});

















// getbyrole-> getbyid->getbytext 