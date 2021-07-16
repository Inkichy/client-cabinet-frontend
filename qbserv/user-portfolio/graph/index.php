<?php
$start = DateTime::createFromFormat('d.m.Y', $_REQUEST['start']);
$end = DateTime::createFromFormat('d.m.Y', $_REQUEST['end']);
$arValues = [];
while ($start < $end) {
    $start->add(DateInterval::createfromdatestring('+1 day'));
    $arValues[] = [$start->getTimestamp()*1000, rand(6000,7000)];
}
header('Content-Type: application/json');
echo(json_encode($arValues));