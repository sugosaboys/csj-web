export interface cta{
    label: string;
    link: string;
}
export interface navbar{
    label: string;
    link: string;
}
export interface Navigation{
    cta: cta;
    navbar: navbar[];
}

export interface fullImage{
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
    __component:"text.description";
    description:string;
}

export interface types{
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
    __component:"package.package";   
    Title:string;
    subTitle:string;
    types:types[];
}

export interface allcard{
    Title:string;
    description:string;
    logo:{
        url:string;
        name:string;
    };
}

export interface features{
   __component: "cards.featured";
    Title:string;
    description:string;
    allCards:allcard[];
}

export interface Slider{
    __component:"carousel.slider";
    image:{
        url:string;
        name:string;
    }[];
}

export interface customerCare{
    label:string;
    link:string;
}

export interface socialmedia{
    image:{
        url:string;
        name:string;
    }
    link:string;
}

export interface Footer {
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
        heading: string;
        Title: string;
        navigation: Navigation;
        content: contentSection[];
        Footer:Footer;
    }
}