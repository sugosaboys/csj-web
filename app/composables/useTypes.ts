export interface cta{
     id:number;
    label: string;
    link: string;
}
export interface navbar{
     id:number;
    label: string;
    link: string;
}
export interface Navigation{
     id:number;
    cta: cta;
    navbar: navbar[];
}

export interface fullImage{
     id:number;
    __component: "hero.full-image";
    image:{
        url:string;
        name:string;
    };
    hoverImage:{
        url:string;
        name:string;
    }
}

export interface flexImage{
     id:number;
    __component: "hero.flex-image";
    image1:{
        url:string;
        name:string;
    };
    hoverImage1:{
        url:string;
        name:string;
    }
    image2:{
        url:string;
        name:string;
    };
    hoverImage2:{
        url:string;
        name:string;
    }
}

export interface description{
     id:number;
    __component:"text.description";
    description:string;
}

export interface types{
     id:number;
    Title:string;
    description:string;
    image:{
        url:string;
        name:string;
    };
    cta:{
        label:string;
        link:string;
    }
    Price:string;
    Brief:string;
    information:string;
}

export interface packages{
     id:number;
    __component:"package.package";   
    Title:string;
    subTitle:string;
    types:types[];
}

export interface allcard{
     id:number;
    Title:string;
    description:string;
    logo:{
        url:string;
        name:string;
    };
}

export interface features{
     id:number;
   __component: "cards.featured";
    Title:string;
    description:string;
    allCards:allcard[];
}

export interface Slider{
     id:number;
    __component:"carousel.slider";
    image:{
        url:string;
        name:string;
    }[];
}

export interface customerCare{
    id:number;
    label:string;
    link:string;
}

export interface socialmedia{
    id:number;
    image:{
        url:string;
        name:string;
    }
    link:string;
}

export interface Footer {
    id:number;
    BackgroundImage:{
        url:string
        name:string
    }
    Title:string;
    CustomerCare:customerCare[];
    SocialMedia:socialmedia[];
}

export type contentSection = fullImage | flexImage | description | Slider | packages | features;

export interface homepage{
    data:{
        id:number;
        heading: string;
        Title: string;
        navigation: Navigation;
        content: contentSection[];
        Footer:Footer;
    }
}