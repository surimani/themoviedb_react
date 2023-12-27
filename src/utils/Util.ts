export function getImageUrl(url: string) {
    return `https://image.tmdb.org/t/p/original${url}`
}

export function toHours(duration: number) {
    return `${Math.floor(duration/60)}h${duration%60 === 0 ? '' : ' ' + (duration%60)+'m'}`;
}

export function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-us', { month:"short", day:"numeric", year: "numeric"});
}

export function getCertification(releaseDates: (any)[]) {
    return releaseDates?.find(relDate => relDate.iso_3166_1 == 'US')?.release_dates?.find(relDate => relDate.certification)?.certification;
}

export function getFilteredCrew(crewList: (any)[]) {
    return crewList?.filter(crew => {
        return crew.job == "Producer" || crew.job == "Director" || crew.job == "Writer"
    })
}

export function getFilteredCast(castList: (any)[]) {
    return castList?.filter(cast => {
        return cast.order <= 7
    })
}

export function getTrailers(videos:(any)[]) {
    return videos?.filter(video => {
        return video.type == "Trailer" || video.type == "Teaser"
    })
}