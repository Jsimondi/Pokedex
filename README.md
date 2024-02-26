# Pokedex Project
This is a study project / activity proposed by [IPMedia](https://ipmedia.com.br). The idea is to consume the [PokeAPI](https://pokeapi.co) and display multiple pokemons by their type. I've delved a bit deeper and tried to set a couple other functionalities to expand and test my abilities on Angular development.

![Image1] (https://github.com/Jsimondi/Pokedex/tree/main/Pokedex/src/assets/github/Pokedex1.PNG?raw=true "Landing Page")

![Image2] (https://github.com/Jsimondi/Pokedex/tree/main/Pokedex/src/assets/github/Pokedex2.PNG?raw=true "Main Page")


### Running the project
This project is currently being developed in [Angular](https://angular.io) version 16.2.12.
To run this project you will need:
1. Make sure you have [Node](https://nodejs.org/en) on your machine. If you don't have any version installed, i suggest the latest version (20.11.1). You can check for your node version running ```node --version``` on any terminal.
2. Install Angular CLI via ```npm install -g @angular/cli```. You can check for any installed Angular Version using the CLI command: ```ng version```.
3. Clone this project. If you don't have [GIT](https://git-scm.com), access their download page for the latest version and follow the install instructions.
4. Access the folder where the project was cloned and install all node libraries included in the project by running ```npm install```.
5. Run the project using ```ng serve``` and access http://localhost:4200.
6. Have fun exploring and testing this simple project!

### Features
I've took the liberty to expand a bit on the initial features that were proposed, but tried to maintain the core idea of the activity that was requested. My idea is to expand on this project, keeping it for studies purposes and try to implement new features with time.
- The initial screen should display all the Pokémon types
- Clicking on a type should navigate to the ```pokemon-type/:type route```
- The list of Pokémon of a given type should have pagination and show 10 items per page
- It should use RxJs

Were the ones i attented myself the most. But this project also includes:
- **Filter** for up to two Pokemon types.
    - You can only select up to two types, for now. And it will display all Pokemon that are from those two types.
    - At least one Pokemon type must be selected at all times. If you try De-selecting it, it does nothing for now.
- **Paginator** for you to navigate between the pages of your selections. You can use the arrows or click on a page.
- **Searchbar** for you to search Pokemon by name/letters.
    - For now it, only returns Pokemon that contain those letters in their name.
    - If you type a full name, it will return that Pokemon **ONLY** if his **Type was already selected**.
    - Ex: If you type "charmander" when the Fire type is selected, it returns Charmander. If his type was not selected it will not return Charmander.
- **Query** in the URL for you to input up to two types and a change in the amount of Pokemon cards that you want to see.
    - ```http://localhost:4200/types?type1=fire&type2=flying&limit=10``` will display Fire and Flying Pokemon, showing 10 per page.
- **Clicking** on a **Pokemon type inside it's card** will navigate you to that type.
- **Not Found** display for when no results match the filters.

### Goals
As a study project, i intend to keep adding features to it and correcting the bugs that i encounter. For now, what i have in mind are:
- Add a **Header** and maybe a **Footer** for displaying simple information such as a Logo and allow access to different pages.
- Make the website responsive for multiple screen sizes and mobile.
- Add information about a Pokemon when you **Click** on it.
- **Improve** the **project's** core **code** and set standards to be followed further on.
- **Type** everything properly.
- Create a **CSS Library** with color codes for the project's colors.
- Re-think the way i consume the PokeAPI so i can have access to ALL Pokemon beforehand and improve the way i search/filter for them.
- **Improve** the **filter selector** so it accepts multiple filters and re-think the way i'll display them.
- **Paginator** not show left and right arrows for when there is only one page.
- **Fix Bugs!**

I'll maintain the project as is, for the purpose of delivering a "finished version" of this activity. But as i complete the goals above i'll be crossing them from the list.

### Copyrights
I do not own any of the images used in this project. The purpose of this project is study only. All the Pokemon images are owned by Nintendo and i appreciate the PokeAPI Project for their work.