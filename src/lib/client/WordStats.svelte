<script lang="ts">
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import type { statsSchema } from "$lib/server/types";

    export let stats: statsSchema[];

    let chart: HTMLDivElement;

    onMount(() => {
        const [MY, MX] = [20, 30];
        const margin = { top: MY, right: MX, bottom: MY+20, left: MX };
        const pWidth = chart.parentElement?.clientWidth;
        if (!pWidth) return;
        const width = pWidth - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select(chart)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .range([0, width])
            .domain(stats.map(d => d.date))
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(stats, d => +d.word_count) || 0])
            .range([height, 0]);

        svg.selectAll(".bar")
            .data(stats)
            .enter().append("rect")
            .attr("class", "fill-primary/30 hover:fill-primary transition-colors duration-300")
            .attr("x", d => x(d.date) || 0)
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.word_count))
            .attr("height", d => height - y(d.word_count))

        svg.selectAll(".bar-label")
            .data(stats)
            .enter().append("text")
            .attr("class", "fill-foreground font-light") // Tailwind classes
            .attr("x", d => (x(d.date) || 0) + x.bandwidth() / 2)
            .style('font-size', '10px')
            .attr("y", d => y(d.word_count) - 5)
            .attr("text-anchor", "middle")
            .text(d => d.word_count);

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat((d: string) => {
                const date = new Date(d);
                return date.toLocaleString('default', { month: 'short', day:"2-digit" });
            }))
            .selectAll('text')
            .style('text-anchor', 'end')
            .style('font-size', '9px')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-30)');

        svg.append('g')
            .call(d3.axisLeft(y));
    });
</script>

<div bind:this={chart}></div>