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

## Data

The data is stored in a two collections: one that stores occurrence probabilities, *OCCURRENCE*, and the other that stores pairs of climatic indicators, "PAIRS".

The *OCCURRENCE* collection records are structured as follows:

- `_key`: The MD5 hash of the geometry.
- `geometry`: The coordinate *point* of the occurrence as a GeoJSON structure.
- `properties`: This property contains all probability data related to the `geometry`:
  - `species`: The list of *scientific names*, genus and species, of trees observed in that location.
  - `probabilities`: The *occurrence probability*, current and future, for each individual species. This block contains one  property for each species, *named as the species*:
    - `cur2005`: This property contains `value`, which is the probability, 0 to100, that the species *currently occurs* at that coordinate. The data is centered around the year 2005.
    - `fut2035`, `fut2065` and `fut2095`: These properties provide the *probability* that the species occurs respectively in the *future periods* centered around 2035, 2065 and 2095. The property contains two sub-properties that correspond to the Representative Concentration Pathway (RCP) climate change projection for which the future occurence probabilities have been forecasted: `rcp45` contains the probability for the *RCP4.5* scenario and `rcp85` contains the probability for the *RCP8.5* scenario, the probability value is set at these properties.

Here is an example record:

```json
{
    "geometry": {
        "type": "Point",
        "coordinates": [
            -3.125,
            56.875
        ]
    },
    "properties": {
        "species": [
            "Acer platanoides",
            "Acer pseudoplatanus"
        ],
        "probabilities": {
            "Acer platanoides": {
                "cur2005": {"value": 2},
                "fut2035": {
                    "rcp45": 2,
                    "rcp85": 2
                },
                "fut2065": {
                    "rcp45": 2,
                    "rcp85": 2
                },
                "fut2095": {
                    "rcp45": 2,
                    "rcp85": 2
                }
            },
            "Acer pseudoplatanus": {
                "cur2005": {"value": 1},
                "fut2035": {
                    "rcp45": 2,
                    "rcp85": 2
                },
                "fut2065": {
                    "rcp45": 2,
                    "rcp85": 2
                },
                "fut2095": {
                    "rcp45": 3,
                    "rcp85": 3
                }
            }
        }
    }
}
```

The *PAIRS* collection is a 5 arc minute grid of climate indicators that can be used in pairs to display scatter plots. Each record of the collection is structured as follows:

- `geometry`: The coordinate *polygon* corresponding to the grid cell as a GeoJSON structure.
- `properties`: This property contains all *current and future* climate indicator values at the `geometry`:
  - `indicators`: This property contains a set of climatic indicators, related to the current grid cell, for the following periods: `1960-1990`, `1991-2020`, `2021-2050` and `2051-2080`. *1960-1990* is considered the current period and contains the record of indicator values. The other periods are future forecasted values for the same indicators, these contain two blocks of indicator data each corresponding to the same RCP scenarios, `rcp45` and `rcp85`, used for the species probabilities. The current indicators are:
    - `bio01`: Mean annual air temperature.
    - `bio12`: Annual precipitation amount.
    - `bio15`: Precipitation seasonality.
    - `ci`: Continentality.
    - `ps`: Summer precipitation.
    - `pw`: Winter precipitation.
    - `ts`: Summer temperature.

Here is an example record:

```json
{
	"geometry": {
		"type": "Polygon",
		"coordinates": [
			[
				[
					44.666666666666664,
					66.83333333666667
				],
				[
					44.583333333333336,
					66.83333333666667
				],
				[
					44.583333333333336,
					66.75000000333333
				],
				[
					44.666666666666664,
					66.75000000333333
				],
				[
					44.666666666666664,
					66.83333333666667
				]
			]
		]
	},
    "properties": {
        "1960-1990": {
            "bio01": 4.9,
            "bio12": 1071,
            "bio15": 18,
            "ci": 12,
            "ps": 237,
            "pw": 310,
            "ts": 10.8
        },
        "1991-2020": {
            "rcp45": {
                "bio01": 5.5,
                "bio12": 1063,
                "bio15": 20,
                "ci": 12,
                "ps": 236,
                "pw": 310,
                "ts": 11.5
            },
            "rcp85": {
                "bio01": 5.5,
                "bio12": 1060,
                "bio15": 19,
                "ci": 12,
                "ps": 234,
                "pw": 307,
                "ts": 11.5
            }
        },
        "2021-2050": {
            "rcp45": {
                "bio01": 6.1,
                "bio12": 1076,
                "bio15": 21,
                "ci": 12,
                "ps": 233,
                "pw": 319,
                "ts": 11.9
            },
            "rcp85": {
                "bio01": 6.3,
                "bio12": 1086,
                "bio15": 20,
                "ci": 12,
                "ps": 230,
                "pw": 319,
                "ts": 12
            }
        },
        "2051-2080": {
            "rcp45": {
                "bio01": 6.7,
                "bio12": 1080,
                "bio15": 21,
                "ci": 12,
                "ps": 229,
                "pw": 320,
                "ts": 12.3
            },
            "rcp85": {
                "bio01": 7.4,
                "bio12": 1090,
                "bio15": 23,
                "ci": 12,
                "ps": 215,
                "pw": 332,
                "ts": 13.1
            }
        }
    }
}
```

## Services

The services are divided into two sections sections: one section providing data for *maps* and the other providing data for indicator pair *scatterplots*. All services are described in the ArangoDB service tabs on the database.

### Species

This set of services provides information regarding the available species:

- `/species/list`: Return the list of available species.

### Map

This set of services return species occurrence probabilities and their coordinates:

- `/map/stat`: Return the grid points count for all species.
- `/map/array`: Return the grid coordinates for all species as an array.
- `/map/point`: Return the grid coordinates for all species as an array of GeoJSON points.
- `/map/species/stat`: Return the grid points count for the provided species.
- `/map/species/array`: Return the grid coordinates for the provided species as an array.
- `/map/species/point`: Return the grid coordinates for the provided species as an array of GeoJSON points.

### Pairs

This set of services return indicator pair combinations that can be used to display scatter plots:

- `/pair/stat`: Return statistics for indicators pair, period and scenario.
- `/pair/array`: Return indicators pair values for period and scenario as an array.
- `/pair/object`: Return indicators pair values for period and scenario as an object.
- `/pair/species/stat`: Return statistics for indicators pair, species, period and scenario.
- `/pair/species/array`: Return indicators pair values for species, period and scenario as an array.
- `/pair/species/object`: Return indicators pair values for species, period and scenario as an object.
- `/pair/unit/stat`: Return statistics for indicators pair, unit, period and scenario.
- `/pair/unit/array`: Return indicators pair values for unit, period and scenario as an array.
- `/pair/unit/object`: Return indicators pair values for unit, period and scenario as an object.

## License

Copyright (c) 2025 Milko Skofic

License: Apache 2