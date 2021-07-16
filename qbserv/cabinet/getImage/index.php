<?php
if ($_REQUEST['id'] == '1') {
    header('Content-Type: image/svg+xml');
    echo(file_get_contents(__DIR__.'/icon-1.svg'));
} else {
    header('Content-Type: image/png');
    echo(file_get_contents(__DIR__.'/image.png'));
}
