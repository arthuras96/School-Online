# School Online (SOL)
<p align="center">Front-end do sistema School Online (SOL).</p>

### Pré-requisitos

[Angular CLI](https://angular.io/guide/setup-local).

### ⚙️ Executar servidor de desenvolvimento
#### Execute os seguintes comandos:
##### Clonar o repositório:
	git clone https://github.com/arthuras96/school-online.git
##### Instalar dependências:
	npm install
#### Faça as seguintes alterações nos arquivos:
##### Acesse \node_modules\ngx-loading\lib\ngx-loading.module.d.ts e altere a linha 4 para:
	static forRoot(loadingConfig: INgxLoadingConfig): ModuleWithProviders<NgxLoadingModule>;
##### Acesse \node_modules\ngx-tui-image-editor\lib\toast-ui-image-editor.models.d.ts e remova todas as "?" (interrogações) do arquivo.
##### Acesse \node_modules\tui-image-editor\dist\tui-image-editor.js e comente a linha 47017
	//this._buttonElements[this.options.initMenu].dispatchEvent(evt);
##### Acesse \node_modules\node_modules\tui-image-editor\index.d.ts e altere a linha 326 para:
	export default tuiImageEditor.ImageEditor;

##### Executar e abrir projeto
	ng serve --open

### 🖌️ Personalizações
#### Alterar posição do menu de edição de imagens
##### Acesse \node_modules\tui-image-editor\dist\tui-image-editor.js e altere a linha 46355, mudando de
	menuBarPosition: 'bottom'
##### para um dos seguintes:
	menuBarPosition: 'left' //OR
	menuBarPosition: 'right'
###### * A posição topo não funciona por problemas com personalização.

### 📚 Bibliotecas
- [Angular Material](https://material.angular.io/)
- [NGX-Tui-Image-Editor](https://www.npmjs.com/package/ngx-tui-image-editor)
- [NGX-Translate](http://www.ngx-translate.com/)

### Servidor
- [API-SOL](https://github.com/arthuras96/API-SOL)

### Autor
---

<a href="https://github.com/arthuras96">
 <img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/37410769?s=400&u=5660153db0fed01e80d1d797550f875b3b2a12a2&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Arthur Alencar</b></sub></a>


Feito com ❤️ por Arthur Alencar 👋🏽 Entre em contato!

[![Twitter Badge](https://img.shields.io/badge/-@ArthurAlencar_S-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/ArthurAlencar_S)](https://twitter.com/ArthurAlencar_S) 
[![Linkedin Badge](https://img.shields.io/badge/-Arthur-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/arthuralencarsilva/)](https://www.linkedin.com/in/arthuralencarsilva/) 
[![Gmail Badge](https://img.shields.io/badge/-arthuralencarsilva@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:tgmarinho@gmail.com)](mailto:arthuralencarsilva@gmail.com)