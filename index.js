const puppeteer = require("puppeteer");

async function login(frame) {
    await frame.type("#usuario", "70205231454");
    await frame.type("#senha", "Juninho#123");
    await frame.click("#acessar");
}

async function consultarRequerimentoAcesso(frame) {
    console.log("--------- Consultando Status de Requerimento de Acesso ------------------")
    await frame.hover('[value="formsmenu159"]');
    const menuitem = await frame.$$('[id="formsmenu159"] > li');
    await menuitem[0].click();
    await frame.waitFor(2000);
    const subframe = (await frame.childFrames())[0];
    const subframechild = (await subframe.childFrames())[0];
    await subframechild.type('[name="WFRInput651605"]', "70205231454");
    await frame.waitFor(1000);
    await subframechild.click('.cur > table > tbody > tr > td');
    await frame.waitFor(1000);
    const resElement = await subframechild.$eval('div[id="message"]', el => el.innerHTML);
    console.log("RESULTADO: ", resElement);
    console.log("-------------------------------------------------------------------------");
}

async function emitirNota(frame) {
    await frame.$("#formsmenu174")[1];
}

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.goto("https://directa.natal.rn.gov.br/open.do?sys=DIR");

        console.log("----------------------------- Directa Bot -------------------------------")
        console.log(await page.url());

        const frame = (await page.frames())[1];

        //await login(frame);
        
        await consultarRequerimentoAcesso(frame);

        await browser.close();
    } catch (error) {
        console.log(error)
    } finally {
        process.exit(0);
    }
})();