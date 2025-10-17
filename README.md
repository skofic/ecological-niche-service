# Species Viability maps & Indicator Pair Scatterplots

This repository contains the [ArangoDB](https://www.arangodb.com) [Foxx micro services](https://www.arangodb.com/docs/stable/foxx.html) to manage species distribution maps and indicator pairs scatterplot data.

The data must be created using the [ecological-niche-data](https://github.com/skofic/ecological-niche-data) repository, the service setup script will only ensure the collection exists and will eventually add missing indexes and views.

The data provided by this service comes from ***[EU-Trees4F](https://www.nature.com/articles/s41597-022-01128-5)***, which is a *dataset of current and future potential distributions of 67 tree species in Europe*. This data is stored in a single collection that provides the coordinates of species distribution probabilities and selected climatic indicator values for four periods, one characterising the present situation and the other three providing *climatically suitable future areas of occupancy and the future distribution expected under a scenario of natural dispersal for two emission [scenarios](https://en.wikipedia.org/wiki/Representative_Concentration_Pathway)*.
(RCP 4.5 and RCP 8.5) and three time steps (2035, 2065, and 2095).

## Installation

1. You must first either install [ArangoDB](https://www.arangodb.com), or have an existing database available.
2. *Create* or *select* an existing *database*.
3. Run the `process_data.sh` from the [ecological-niche-data](https://github.com/skofic/ecological-niche-data) repository.
4. In the `Services` *left tab* press the `+ Add service` button.
5. Select the `GitHub` *top tab*, set the `Repository*` field to **skofic/ecological-niche-service** and the `Version*` field to **main**; press the `Install` button.
6. An alert will be presented requesting the `Mount point` for the service, you can provide *any suitable value*, ensure the `Run setup?` checkbox is *checked*. Press the `Install` button.

At this point the service should be ready to serve data, provided you have created the collection in step 3.

## Services

The services are divided into two sections sections: one section providing data for *maps* and the other providing data for indicator pair *scatterplots*. All services are described in the ArangoDB service tabs on the database.

### species

This set of services provides information regarding the available species:

- `/species/list`: Return the list of available species.

### map

This set of services cover species coordinates grid and occurrence probabilities:

- `/map/stat`: Return the grid points count for all species.
- `/map/array`: Return the grid coordinates for all species as an array.
- `/map/point`: Return the grid coordinates for all species as an array of GeoJSON points.
- `/map/species/stat`: Return the grid points count for the provided species.
- `/map/species/array`: Return the grid coordinates for the provided species as an array.
- `/map/species/point`: Return the grid coordinates for the provided species as an array of GeoJSON points.

### pair

This set of services cover indicators pair combinations:

- `/pair/stat`: Return statistics for indicators pair, period and scenario.
- `/pair/array`: Return indicators pair values for period and scenario as an array.
- `/pair/object`: Return indicators pair values for period and scenario as an object.
- `/pair/species/stat`: Return statistics for indicators pair, species, period and scenario.
- `/pair/species/array`: Return indicators pair values for species, period and scenario as an array.
- `/pair/species/object`: Return indicators pair values for species, period and scenario as an object.

## License

Copyright (c) 2025 Milko Skofic

License: Apache 2