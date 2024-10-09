var Main;

require(
    [
        "esri/Map",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/layers/ElevationLayer",
        "esri/views/SceneView",
        "esri/widgets/Search",
        "esri/layers/FeatureLayer"
    ],
    function(
       Map, Graphic, GraphicsLayer, ElevationLayer, SceneView, Search, FeatureLayer
    ) {
        $(document).ready(function() {
            Main = (function() {
                let layer = new ElevationLayer({
                    url: "http://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
                });
                var map = new Map({
                    basemap: "satellite",
                    ground: {
                        layers: [layer]
                    },
                });
    
                var view = new SceneView({
                    container: "map",
                    viewingMode: "local",
                    map: map,
                    camera: {
                        position: {
                            x: -105.503,
                            y: 44.270,
                            z: 35500000,
                            spatialReference: {
                                wkid: 4326
    
                            }
                        },
                        heading: 0,
                        tilt: 0
                    },
                    popup: {
                        dockEnabled: true,
                        dockOptions: {
                            breakpoint: false
                        }
                    },
                    environment: {
                        lighting: {
                            directShadowsEnabled: true
                        }
                    }
                
                });

                const searchWidget = new Search ({
                    view:view
                });
                view.ui.add(searchWidget, {
                    position:"top-right"
                });
                
                    
                const initMap = function(){
               
                   
                    // var graphicsLayer = new GraphicsLayer()
                    const graphicsLayer = new GraphicsLayer();
                    map.add(graphicsLayer);
                    for (const [key, value] of Object.entries(myStuff)){
                        console.log(key, value)
                          const point = {
                            type: "point", 
                            x: value.coord[0],
                            y: value.coord[1],
                            z: 10000
                          };
                          
                          const markerSymbol = {
                            type: "picture-marker",  
                            url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
                            width: "50px",
                            height: "50px"
                            
                          };
                      
                          const pointGraphic = new Graphic({
                            geometry: point,
                            symbol: markerSymbol,
                            popupTemplate: {
                                title: key + ": " + value.city + ", " + value.state , 
                            } 
                            
                          });

                          graphicsLayer.add(pointGraphic);
                    
                    }
                    
                    
                }
                initMap()
                return {
           
                };

            })();
        })

    });


    
