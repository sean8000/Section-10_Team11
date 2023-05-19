# Section-10_Team11
Final project for CISC275 by Sean Johnson, Michael Murphy, Michael Lorang, Alexander Marshall, Dean Turner

Our Project is a fantasy football team building website where users can add and delete players from their list to create their perfect team.


# Features 
User features: adding copies of players to their team from the central list, deleteing players from their team, viewing player stats, sorting players by stats such as position

Admin features: add players to the admin list from the central list, delete players from the admin list, edit players and have the changes relected in the admin list

Super features: all admin features, add players to the central list, delete players from the central list, edit players stats

# Domain
The domain consists of a list of football players, which can be used to build an active team for a given user.

# Components

### AddPlayers
Takes the central list of players and renders a set of inputs to add new players to the list

### DragAndDisplay
Handles the rendering of the Super, Admin, and User lists as well as any sub componants that interact with them

### PlayerStats
Renders a button that can be used to reveal and hide a players stats

### roleSelect
A dropdown that can be used to select what role you wish to use as well as an input that allow the adding of new users

### SearchTextBox
An input box that allows users to search for specific players

### SortFilterBox
A component that handles the rendering of SortSelect, PositionFilter, and SearchTextBox sub components and their formatting

### sortSelect
Renders a dropdown to select how to sort players

### SuperAdminEdit
A component that handles the editing subcomponant to allow supers and admins to edit players

### TeamRoster
Takes the users list and counts and displays how many of each position they have as well as a recomended number of each position

### PositionFilter
a set of radio buttons that allows a user to filter players by various attributes

### UserRating
A number box that allows the editing of a players rating


