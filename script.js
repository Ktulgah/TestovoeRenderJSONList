window.addEventListener("DOMContentLoaded", () => {
    let currentPage = 1

    class carsRows {
        constructor(Name, Miles_per_Gallon, Cylinders, Displacement,
                    Horsepower, Weight_in_lbs, Acceleration, Year, Origin) {
            this.Name = Name
            this.Miles_per_Gallon = Miles_per_Gallon
            this.Cylinders = Cylinders
            this.Displacement = Displacement
            this.Horsepower = Horsepower
            this.Weight_in_lbs = Weight_in_lbs
            this.Acceleration = Acceleration
            this.Year = Year
            this.Origin = Origin

        }

        render() {
            const row = document.createElement(`div`)
            row.classList.add(`table__row`)
            row.innerHTML = `
            <div class="table__cell">${this.Name}</div>
            <div class="table__cell">${this.Miles_per_Gallon}</div>
            <div class="table__cell">${this.Cylinders}</div>
            <div class="table__cell">${this.Displacement}</div>
            <div class="table__cell">${this.Horsepower}</div>
            <div class="table__cell">${this.Weight_in_lbs}</div>
            <div class="table__cell">${this.Acceleration}</div>
            <div class="table__cell">${this.Year}</div>
            <div class="table__cell">${this.Origin}</div> `
            document.querySelector(`.table`).append(row)
        }


    }

    document.addEventListener(`scroll`, (evt) => {
        if (document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
            loadPage(++currentPage)
        }
    })

    function showPreloader() {
        const preloader = document.createElement('img')
        preloader.className = 'preloader'
        preloader.setAttribute(`src`, `./preloader.gif`)
        preloader.style.cssText = `
        position:fixed;
        top: 90%;
        left: 50%;
        width: 50px;
        height: 50px;
        z-index: 10`
        document.body.append(preloader)

    }

    function hidePreloader() {
        const preloader = document.querySelector(`.preloader`)
        preloader.remove()
    }

    function loadPage(page) {
        showPreloader()
        const response = getResource(`./data/cars-${page}.json`)
        response.then(response => {
            response.forEach(({
                                  Name, Miles_per_Gallon, Cylinders, Displacement,
                                  Horsepower, Weight_in_lbs, Acceleration, Year, Origin
                              }) => {
                new carsRows(
                    Name, Miles_per_Gallon, Cylinders, Displacement,
                    Horsepower, Weight_in_lbs, Acceleration, Year, Origin
                ).render()
            })
            hidePreloader()
        }).catch(() => {
            hidePreloader()
            }
        )
    }

    loadPage(currentPage)

    async function getResource(url) {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url} status: ${res.status}`);
        }
        return await res.json();
    };
})