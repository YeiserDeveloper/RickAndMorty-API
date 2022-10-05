let page = 1;

const btnPreview = document.getElementById('btn-preview');
const btnNext = document.getElementById('btn-next');

// Search input
// const InputSearch = document.getElementById('search');

// InputSearch.addEventListener('input', () => {
//     if (InputSearch.value) { 
//         console.log(InputSearch.value.toLowerCase()) 
//     }
// })

// Pagination
btnPreview?.addEventListener('click', () => {
    if (page > 1) {
        page -= 1;
        return getFetch();
    };
});

btnNext?.addEventListener('click', () => {
    if (page < 826) {
        page += 1
        return getFetch()
    };
});

const getFetch = async (search) => {
    try {
        let res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
        console.log(res)

        if (res.status === 200) {
            let data = await res.json();
            console.log(data);

            let cards = '';

            data.results.forEach(card => {
                cards += `
                    <div class="card bg-base-300 shadow-xl rounded-[15px]">
                        <figure class="px-5 pt-5"><img class="rounded-[15px]" src="${card.image}"/></figure>
                        <div class="card-body">
                            <h1 class="text-2xl text-center font-bold">${card.name}</h1>
                            <p class="text-md ${card.status === "Alive" ? "text-success" : card.status === "Dead" ? "text-error" : card.status === "unknown" ? "text-warning" : "text-danger"}">
                                <span class="text-md font-bold">Status: ${card.status === "Alive" ? "✅" : card.status === "Dead" ? "☠" : card.status === "unknown" ? "⚠" : "⚠"}</span> ${card.status}
                            </p>
                            <p class="text-md">
                                <span class="text-md font-bold">Specie: ${card.species === "Human" ? "🚶" : "👽"}</span> ${card.species}
                            </p>
                            <p class="text-md">
                                <span class="text-md font-bold">Gender: ${card.gender === "Male" ? "♂" : "♀"}</span> ${card.gender}
                            </p>
                            <p class="text-md">
                                <span class="text-md font-bold">Origin: ${card.origin.name === "unknown" ? "❔" : ""}</span> ${card.origin.name}</p>
                            <p class="text-md">
                                <span class="text-md font-bold">Location:</span> ${card.location.name}
                            </p>
                            <!--<p class="text-md">
                                <span class="text-md font-bold">Created: </span> ${card.created}
                            </p>-->
                        </div>
					</div>
                `;

                search = card.name.toLowerCase();
                console.log(search)
            })

                
            document.getElementById('container').innerHTML = cards;
        } else if (res.status === 404) {
            console.log('Not found');
            const NotFound = `
                <div class="alert alert-warning shadow-lg">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Error ${res.status}! No podemos encontrar la página que estás buscando.</span>
                    </div>
                </div>
            `

            return document.getElementById(`NotFound`).innerHTML = NotFound;
        } else {
            console.log('Something went wrong');

            const NotFound = `
                <div class="alert alert-error shadow-lg">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Error ${res.status}! Algo salió mal.</span>
                    </div>
                </div>
            `

            document.getElementById(`NotFound`).innerHTML = NotFound;
        }
    } catch (e) {
        console.log(e)
    }
}

getFetch()