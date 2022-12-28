
var vulgus_app = null;

function vulgus_app_init(){

	var socialLogin = new laurbe.View({
						menuName:'Login',
						id: 'Login_View',
						items:[
							new laurbe.SocialLoginView({

							})
						]
					});

	var exploreSessionsView = new laurbe.View({
				menuName:'Explore2',
				id: 'Explore2_View',
				items:[
					new laurbe.Container({
						childsWrapperStyle:'text-align:center',
						items:[
							new laurbe.ButtonGroup({
								items:[
									new laurbe.Button({
										text:'Zone',
										onclick:function(_self){
											console.log(this);
											alert('filtering by Zone');
											var dialog = new laurbe.ModalDialog({
															message:'hola caracola'
														});
											dialog._render();
											dialog.show();
										}
									}),
									new laurbe.Button({
										text:'Open Sessions',
										onclick:function(_self){
											alert('filtering by Sessions');
										}
									}),
									new laurbe.Button({
										text:'Date',
										onclick:function(_self){
											alert('filtering by Date');
										}
									}),
									new laurbe.Button({
										text:'Genre',
										onclick:function(_self){
											alert('filtering by Genre');
										}
									})
								]
							})
						]
					}),
					new laurbe.Container({
							items:[
								new laurbe.CardGroup({
											items: [
												new laurbe.Card({
													title:'And Justice For All',
													text:'Full Album Cover session',
													footMessage:'Metal, Metallica',
													img:{
														src: 'https://www.thomann.de/pics/bdb/128185/12948444_800.jpg',
														alt: 'Metallic Aftenoon'
													}
												}),
												new laurbe.Card({
													title:'Anthrax',
													text:'Anthrax embematic Songs for destruction!! ',
													footMessage:'Metal, Anthrax',
													img:{
														src: 'https://images.backstreetmerch.com/images/products/bands/misc/anth/bsi_anth17.jpg',
														alt: 'Anthrax tribute'
													}
												}),
												new laurbe.Card({
													title:'Anthrax',
													text:'Anthrax embematic Songs for destruction!! ',
													footMessage:'Metal, Anthrax',
													img:{
														src: 'https://images.backstreetmerch.com/images/products/bands/misc/anth/bsi_anth17.jpg',
														alt: 'Anthrax tribute'
													}
												}),
												new laurbe.Card({
													title:'Anthrax',
													text:'Anthrax embematic Songs for destruction!! ',
													footMessage:'Metal, Anthrax',
													img:{
														src: 'https://images.backstreetmerch.com/images/products/bands/misc/anth/bsi_anth17.jpg',
														alt: 'Anthrax tribute'
													}
												})
											]
								})
							]

					}),
					new laurbe.Container({
							items:[
								new laurbe.CardGroup({
											items: [
												new laurbe.Card({
													title:'Anthrax',
													text:'Anthrax embematic Songs for destruction!! ',
													footMessage:'Metal, Anthrax',
													img:{
														src: 'https://images.backstreetmerch.com/images/products/bands/misc/anth/bsi_anth17.jpg',
														alt: 'Anthrax tribute'
													}
												}),
												new laurbe.Card({
													title:'Blues Night',
													text:'Some blues  ',
													footMessage:'Blues at Madrid',
													img:{
														src: 'http://xiringuitomarino.com/wp-content/uploads/2017/06/blu.jpg',
														alt: 'Blues Jam Session'
													}
												})
											]
								})
							]

					}),
					new laurbe.Container({
							items:[
								new laurbe.CardGroup({
											items: [
												new laurbe.Card({
													title:'Blues Night',
													text:'Some blues  ',
													footMessage:'Blues at Madrid',
													img:{
														src: 'http://xiringuitomarino.com/wp-content/uploads/2017/06/blu.jpg',
														alt: 'Blues Jam Session'
													}
												})
											]
								})
							]

					}),
					new laurbe.Container({
							items:[
								new laurbe.CardGroup({
											items: [
												new laurbe.Card({
													title:'And Justice For All',
													text:'Full Album Cover session',
													footMessage:'Metal, Metallica',
													img:{
														src: 'https://www.thomann.de/pics/bdb/128185/12948444_800.jpg',
														alt: 'Metallic Aftenoon'
													}
												}),
												new laurbe.Card({
													title:'Blues Night',
													text:'Some blues  ',
													footMessage:'Blues at Madrid',
													img:{
														src: 'http://xiringuitomarino.com/wp-content/uploads/2017/06/blu.jpg',
														alt: 'Blues Jam Session'
													}
												})
											]
								})
							]

					})
				]
});

var mySessionsView = new laurbe.View({
				menuName:'MySessions',
				id: 'MySessions_View',
				items:[
					new laurbe.Container({
							items:[
								new laurbe.CardGroup({
											items: [
												new laurbe.Card({
													title:'And Justice For All',
													text:'Full Album Cover session',
													footMessage:'Metal, Metallica',
													img:{
														src: 'https://www.thomann.de/pics/bdb/128185/12948444_800.jpg',
														alt: 'Metallic Aftenoon'
													}
												})
											]
								})
							]

					}),
					new laurbe.Container({
							items:[
								new laurbe.CardGroup({
											items: [
												new laurbe.Card({
													title:'And Justice For All',
													text:'Full Album Cover session',
													footMessage:'Metal, Metallica',
													img:{
														src: 'https://www.thomann.de/pics/bdb/128185/12948444_800.jpg',
														alt: 'Metallic Aftenoon'
													}
												})
											]
								})
							]

					}),
					new laurbe.Container({
							items:[
								new laurbe.CardGroup({
											items: [
												new laurbe.Card({
													title:'And Justice For All',
													text:'Full Album Cover session',
													footMessage:'Metal, Metallica',
													img:{
														src: 'https://www.thomann.de/pics/bdb/128185/12948444_800.jpg',
														alt: 'Metallic Aftenoon'
													}
												})
											]
								})
							]

					})
				]
});
var detailedSession = new laurbe.View({
				menuName:'Detailed Session',
				id: 'DetailedSessionView',
				items:[
					new laurbe.Container({
							items:[
								new laurbe.CardGroup({
											items: [
												new laurbe.Card({
													title:'And Justice For All',
													text:'Full Album Cover session',
													footMessage:'Metal, Metallica',
													img:{
														src: 'https://www.thomann.de/pics/bdb/128185/12948444_800.jpg',
														alt: 'Metallic Aftenoon'
													},
													items:[
														new laurbe.CommentsGroup({
																	title:'Set List',
																	id:'detailedSessionSetList',
																	items:[
																		new laurbe.Comment({
																			 title:'Manolo',
																			 items:[
																					 new laurbe.SpotifyAudio({
																						src: 'https://open.spotify.com/embed/track/32OlwWuMpZ6b0aN2RZOeMS'
																					 }),
																					 new laurbe.SpotifyAudio({
																						src: 'https://open.spotify.com/embed/track/69kOkLUCkxIZYexIgSG8rq'
																					 }),
																					 new laurbe.SpotifyAudio({
																						src: 'https://open.spotify.com/embed/track/1BECwm5qkaBwlbfo4kpYx8'
																					 }),
																					 new laurbe.SpotifyAudio({
																						src: 'https://open.spotify.com/embed/track/78XG7U0UueeC86XpzF9O7f'
																					 })
																					 
																			 ]
																		})
																	]
														}),
														new laurbe.Button({
																						text:'boton 11!!',
																						span:{
																							text:'4'
																						},
																						onclick:function(){
																							
																							var setListWrapper = laurbe.Directory['detailedSessionSetList'];
																							
																							setListWrapper._appendChilds([
																									new laurbe.SpotifyAudio({
																											id:'newSong',
																											src: 'https://open.spotify.com/embed/track/78XG7U0UueeC86XpzF9O7f'
																										 })	
																								], true);

																							laurbe.utils.focusAndScrollToElement('newSong');

																						}
																					}),
														new laurbe.CommentsGroup({
																	title:'Session Comments',
																	items:[
																		new laurbe.Comment({
																			 title:'Manolo',
																			 img:{
																				src:'./images/icons/guitar/favicon.png'
																			 },
																			 items:[
																					 new laurbe.YouTubeVideo({
																						src: 'https://www.youtube.com/embed/fA4IHJnKYiw'
																					 })
																			 ]
																		}),
																		new laurbe.Comment({
																			 title:'Daniel',
																			 img:{
																				 src:'https://yt3.ggpht.com/-tO_SdVYSVg8/AAAAAAAAAAI/AAAAAAAAAAA/t089mcHnzD0/s100-mo-c-c0xffffffff-rj-k-no/photo.jpg'
																			 },
																			 text:'Tu opinion me importa una mierda, erres mas feo que yo, maldito imbecil'
																		}),
																		new laurbe.Comment({
																			 title:'Manolo',
																			 img:{
																				src:'./images/icons/guitar/favicon.png'
																			 },
																			 text:'Bueno, a mi no me pareces tan feo, pero si que es verdad que te podrias lavar un poco mas, aunque sea en fin de semana.',
																			 items:[
																					 new laurbe.Video({
																							 src: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'
																					 })
																			 ]
																		}),
																		new laurbe.Comment({
																			 title:'Daniel',
																			 img:{
																				src:'https://yt3.ggpht.com/-tO_SdVYSVg8/AAAAAAAAAAI/AAAAAAAAAAA/t089mcHnzD0/s100-mo-c-c0xffffffff-rj-k-no/photo.jpg'
																			 },
																			 text:'Ok, te aviso cuando cambie de opinion'
																		})
																	]
															})

													]
												})
											]
								})
								







							]

					}),
					new laurbe.Container({
							items:[
								
							]

					})
				]
});
var myProfileView = new laurbe.View({
					menuName:'Account',
					items:[
							new laurbe.Layout({
											items: [
												new laurbe.Region({
													text:'',
													items:[
														new laurbe.Form({
															items:[
																new laurbe.Image({
																	img_src: 'https://yt3.ggpht.com/-tO_SdVYSVg8/AAAAAAAAAAI/AAAAAAAAAAA/t089mcHnzD0/s100-mo-c-c0xffffffff-rj-k-no/photo.jpg',
																	alt:'Daniel Peña Perez',
																	onclick: function(){
																		alert('Yeah, Rock Now!');
																	}
																}),
																new laurbe.TextField({
																	label:'Name',
																	value:'Daniel Peña Perez (el "serpiente")'
																}),
																new laurbe.TextField({
																	label:'edad',
																	value:'40'
																}),
																new laurbe.TextField({
																	label:'Score',
																	value:'4/5'
																}),
																new laurbe.TextField({
																	label:'Plays',
																	value:'Guitar, Bass'
																}),
																new laurbe.TextField({
																	label:'Zones',
																	value:'Madrid , Spain'
																})

															]
														})
														
													]
												})
											]
										})
					]
				});				




vulgus_app = new laurbe.App({
	title:'Music Arena',
	navBar:{
		brand:{
			logoUrl:'https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-outline.svg'
		},
		searchTool:{
			placeholder:'que estas buscando..?'
		}
	},
	views:[	exploreSessionsViewGridDinamic,
			socialLogin,
			exploreSessionsView, 
			mySessionsView,
			//detailedSession,
			detailedView,
			myProfileView,
			dynamicView ],
	dao: new laurbe.RestDAO({
					//basePath:'http://localhost:3000/laurbe'
					basePath:'.'
	}),
	storageManager: new laurbe.LocalStorageManager({
			
	}),  	
	bottomNavBar:{
		items:[
					new laurbe.NavBarBottomMenuItem({
						items:[
							new laurbe.Button({
								// text:'Explore',
								extraClass:'btn-block',
								type:'secondary',
								//span:{ text:'4'},
								image:{
									src: "https://img.icons8.com/ios/64/000000/search--v4.png"
								},
								onclick:function(){
									vulgus_app._navigate('ExploreSessions_View', {"genre": "metal"});
				
								}
							})
						]
					}),
					new laurbe.NavBarBottomMenuItem({
						items:[
							new laurbe.Button({
								//text:'Home',
								extraClass:'btn-block',
								type:'secondary',
								image:{
								 	src: "https://img.icons8.com/wired/64/000000/homer-simpson.png"
								},
								onclick:function(){
									vulgus_app._navigate('ExploreSessions_View', {"genre": "metal"});
				
								}
							})
						]
					}),
					new laurbe.NavBarBottomMenuItem({
						items:[
							new laurbe.Image({
								img_src: 'https://img.icons8.com/wired/50/000000/left.png',
								alt:'Back',
								width:"32",
								height:"32",
								onclick: function(){
									alert('Haciendo back');
								}
							})
						]
					}),
					new laurbe.NavBarBottomMenuItem({
						items:[
							new laurbe.Image({
								img_src: 'https://img.icons8.com/wired/64/000000/person-at-home.png',
								alt:'tom cruise',
								width:"32",
								height:"32",
								onclick: function(){
									var token =vulgus_app.storageManager.get('vulgus_token');
									if(!token){
										var loginToken = Math.random();
										vulgus_app.storageManager.save('vulgus_token', loginToken);
										alert("sucessfully loggedin "+loginToken);
									}else{
										alert('ya logueado '+token);
									}
								}
							})
						]
					}),
					new laurbe.NavBarBottomMenuItem({
						items:[
							new laurbe.Image({
								img_src: 'https://www.idalsys.com/wp-content/uploads/2019/03/whatsapp-icon-273x300.png',
								alt:'tom cruise',
								width:"32",
								height:"32",
								onclick: function(){
									var currentURL = vulgus_app.navigatorManager.getCurrentViewCompleteURL();
									vulgus_app.shareSocialManager.shareCurrentViewToWassap(currentURL);
								}
							})
						]
					}),
					new laurbe.NavBarBottomMenuItem({
						items:[
							new laurbe.Image({
								img_src: 'https://key0.cc/images/preview/33822_98c940126c635dc1d39a6a275a915c3a.png',
								alt:'share',
								width:"32",
								height:"32",
								onclick: function(){
									var currentURL = vulgus_app.navigatorManager.getCurrentViewCompleteURL();
									vulgus_app.shareSocialManager.shareCurrentViewToAllAvailable("VulgusAPP te enrrolla colega", currentURL);
								}
							})
						]
					})
					

					
		]
	}
});
vulgus_app.init();
console.log('cargado desde js');
}


