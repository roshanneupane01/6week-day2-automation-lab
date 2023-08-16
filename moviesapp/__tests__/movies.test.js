const { Builder, Browser, By, until } = require('selenium-webdriver');

let driver;
let addedMovie;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

describe('Test the Movies App', () => {
    // test('can cross off a movie', async () => {
    //     await driver.get('http://localhost:3000/');
    //     await driver.sleep(2000);
    
    //     await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('movie1');
    //     await driver.sleep(2000);
    
    //     await driver.findElement(By.css('button[type="submit"]')).click();
    //     await driver.sleep(2000);
    
    //     addedMovie = await driver.wait(until.elementLocated(By.css('#movies-list li label')), 5000);
    
    //     await driver.sleep(1000);
    
    //     const labelForCheckbox = await addedMovie.getAttribute('for');
    //     const checkbox = await driver.findElement(By.css(`input[type="checkbox"][id="${labelForCheckbox}"]`));
    //     await checkbox.click();
    
    //     // Wait for the checkbox to be checked and movie crossed off
    //     await driver.wait(async () => {
    //       const isCrossedOff = await addedMovie.getAttribute('class');
    //       return isCrossedOff.includes('checked');
    //     }, 5000, 'Movie was not crossed off within timeout');
    
    //     // Additional assertion to verify that the movie is crossed off
    //     const crossedOffMovie = await driver.findElement(By.css('.checked'));
    //     expect(crossedOffMovie).toBeTruthy();
    //   });      

  test('notifications are displayed', async () => {
    await driver.get('http://localhost:3000/');
    await driver.sleep(2000);

    await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('movie1');
    await driver.sleep(2000);

    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(2000);

    const notification = await driver.findElement(By.id('message'));
    expect(await notification.getAttribute('class')).not.toContain('hide');
  });

  test('can delete a movie', async () => {
    await driver.get('http://localhost:3000/');
    await driver.sleep(2000);
  
    await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('movie1');
    await driver.sleep(2000);
  
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(2000);
  
    const addedMovie = await driver.wait(until.elementLocated(By.css('#movies-list li label')), 5000);
  
    await driver.findElement(By.css("button.delete-btn")).click();
    await driver.sleep(2000);
  
    const deletedMovies = await driver.findElements(By.css('#movies-list li label'));
  
    expect(deletedMovies.length).toBe(0);
  });  
});