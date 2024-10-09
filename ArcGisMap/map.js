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
                    viewingMode: "global",
                    map: map,
                    center: [-147.3534, 64.7552],
                    zoom: 13,
                    camera: {
                        position: {
                            x: -147.3534,
                            y: 64.7552,
                            z: 4500000,
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
                            color: "red",
                            width: "25px",
                            height: "25px",
                            
                          };
                      
                          const pointGraphic = new Graphic({
                            geometry: point,
                            symbol: markerSymbol,
                            color: "#c86558",
                            alignment : "bottom-center",
                            popupTemplate: {
                                title: value.city + ", " + value.state + "     -->    "+ key,
                                content: "This is an important point in my life",
                                alignment:"bottom-center"                                
                            }
                            
                            
                            
                          });
                        

                          graphicsLayer.add(pointGraphic);
                        
                          view.goTo({
                            target: markerSymbol,
                            heading: 0,
                            tilt: 20
                          });


                          const clusterLayer = new FeatureLayer({
                           featureReduction:{
                            type:"cluster",
                            target: pointGraphic,
                            size: 4,
                            color: "#c86558"}

                          });
                            map.add(clusterLayer)
                    }
                    
                    
                }
                initMap()
                return {
           
                };

            })();
        })

    });


    
